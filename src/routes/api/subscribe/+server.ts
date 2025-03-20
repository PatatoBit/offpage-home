import { json } from '@sveltejs/kit';
import MailerLite from '@mailerlite/mailerlite-nodejs';
import { MAILERLITE_API_KEY } from '$env/static/private';

const mailerlite = new MailerLite({
	api_key: MAILERLITE_API_KEY
});

export async function POST({ request }) {
	try {
		const { email } = await request.json();

		if (!email) {
			return json({ status: 'error', message: 'Email is required' }, { status: 400 });
		}

		// ✅ Await the API call properly
		const response = await mailerlite.subscribers.createOrUpdate({ email });

		// ✅ Return structured response
		return json({ status: 'success' }, { status: 200 });
	} catch (error) {
		console.error('MailerLite error:', error);

		// If MailerLite responds with an error
		if (error instanceof Error && 'response' in error) {
			const err = error as { response: { data: any; status: number } };
			return json(
				{
					status: 'error',
					message: 'MailerLite API error',
					data: err.response.data
				},
				{ status: err.response.status || 500 }
			);
		}

		// Generic server error
		return json(
			{ status: 'error', message: 'Internal server error', data: error },
			{ status: 500 }
		);
	}
}
