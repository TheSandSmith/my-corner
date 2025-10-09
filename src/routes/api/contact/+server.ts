import type { APIRoute } from 'astro';
import type { SpamValidation } from '../../../types/types.ts';
import { EMAIL_REGEX } from '@utils/utils.ts';

interface ContactFormData {
  name: string;
  email?: string;
  message: string;
  timestamp: number;
  spamAnalysis: SpamValidation;
}

const MAX_MESSAGE_LENGTH = 400;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data: ContactFormData = await request.json();

    // Server-side validation
    const validation = validateFormData(data);
    if (!validation.isValid) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Validation failed',
          details: validation.errors,
        }),
        { status: 400 }
      );
    }

    // Handle spam detection
    if (data.spamAnalysis.isPossibleSpam && data.spamAnalysis.isHardBlock) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Submission blocked',
          reason: data.spamAnalysis.detectedReason,
        }),
        { status: 403 }
      );
    }

    // Log the submission (you can replace this with database storage, email sending, etc.)
    console.log('Contact form submission:', {
      name: data.name,
      email: data.email || 'Not provided',
      message: data.message,
      timestamp: new Date(data.timestamp).toISOString(),
      spamAnalysis: data.spamAnalysis,
    });

    // TODO: Replace with your preferred method of handling form submissions:
    // - Save to database
    // - Send email notification
    // - Send to external service (e.g., Formspree, Netlify Forms)

    // For now, we'll just log and return success
    // If this is a possible spam but not hard blocked, you might want to flag it
    if (data.spamAnalysis.isPossibleSpam) {
      console.log('⚠️  Possible spam detected:', data.spamAnalysis.detectedReason);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Message received successfully',
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Internal server error',
      }),
      { status: 500 }
    );
  }
};

function validateFormData(data: ContactFormData) {
  const errors: string[] = [];

  // Required fields
  if (!data.name?.trim()) {
    errors.push('Name is required');
  }

  if (!data.message?.trim()) {
    errors.push('Message is required');
  } else if (data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters');
  } else if (data.message.length > MAX_MESSAGE_LENGTH) {
    errors.push(`Message must be ${MAX_MESSAGE_LENGTH} characters or less`);
  }

  // Optional email validation
  if (data.email && data.email.trim() && !EMAIL_REGEX.test(data.email)) {
    errors.push('Invalid email format');
  }

  // Timestamp validation
  if (!data.timestamp || typeof data.timestamp !== 'number') {
    errors.push('Invalid timestamp');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
