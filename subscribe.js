const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method not allowed' });
    }

    if (!supabase) {
        console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env var');
        return res.status(500).json({ error: 'Mailing list is not configured' });
    }

    const { email } = req.body || {};
    const isValid = typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!isValid) {
        return res.status(400).json({ error: 'Invalid email address' });
    }

    try {
        const { error } = await supabase
            .from('subscribers')
            .insert({ email: email.trim().toLowerCase() });

        if (error) {
            // Unique constraint violation -> already on the list, not a real error.
            if (error.code === '23505') {
                return res.status(200).json({ ok: true, alreadySubscribed: true });
            }
            console.error('Supabase insert error:', error);
            return res.status(500).json({ error: 'Unable to save email' });
        }

        return res.status(200).json({ ok: true });
    } catch (err) {
        console.error('Subscribe error:', err);
        return res.status(500).json({ error: 'Unable to save email' });
    }
};
