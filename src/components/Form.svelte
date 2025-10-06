<script lang="ts">
  import { onMount } from 'svelte';
  import type { FormData, Errors, SpamValidation } from '../types/types.ts';
  import { EMAIL_REGEX, SPAM_KEYWORD_SET } from '@utils/utils.ts';

  let formData: FormData = {
    name: '',
    email: '',
    message: '',
    honeypot: '',
    timestamp: 0,
  };

  let errors: Errors = {};
  let formStartTime = 0;

  let isSubmitting = false;
  let submitMessage = '';
  let isSubmitSuccess = false;

  const MIN_FORM_TIME = 3000;
  const MAX_FORM_TIME = 300000;
  const MAX_MESSAGE_LENGTH = 400;

  $: nameValid = formData.name && formData.name.trim().length > 0;
  $: messageValid = formData.message && formData.message.trim().length >= 10;
  $: isFormValid = nameValid && messageValid;
  $: remainingChars = MAX_MESSAGE_LENGTH - formData.message.length;

  onMount(() => {
    formStartTime = Date.now();
  });

  function validateForm(): boolean {
    errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (formData.email.trim() && !EMAIL_REGEX.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }

    if (!formData.message.trim() && formData.message.length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }

    if (formData.message.length > MAX_MESSAGE_LENGTH) {
      errors.message = `Message must be ${MAX_MESSAGE_LENGTH} characters or less. For longer messages, please email me directly.`;
    }

    return Object.keys(errors).length === 0;
  }

  function checkForSpam(): SpamValidation {
    const now = Date.now();
    const formFillDuration = now - formStartTime;

    if (formData.honeypot) {
      return {
        isPossibleSpam: true,
        detectedReason: 'Bot detected: honeypot filled',
        isHardBlock: true,
      };
    }

    if (formFillDuration < MIN_FORM_TIME) {
      return {
        isPossibleSpam: true,
        detectedReason: 'Form submitted too quickly',
        isHardBlock: true,
      };
    }

    if (formFillDuration > MAX_FORM_TIME) {
      return {
        isPossibleSpam: true,
        detectedReason: 'Form session expired',
        isHardBlock: true,
      };
    }

    if (formData.message.includes('http://') || formData.message.includes('https://')) {
      return {
        isPossibleSpam: true,
        detectedReason: 'No links allowed in messages',
        isHardBlock: false,
      };
    }

    const messageText = formData.message.toLowerCase().replace(/\s+/g, ''); // Remove spaces for better detection

    // Check for spam keywords using Set (O(1) lookup per word)
    const words = messageText.split(/[^a-z0-9]+/); // Split on non-alphanumeric

    for (const word of words) {
      if (SPAM_KEYWORD_SET.has(word)) {
        return {
          isPossibleSpam: true,
          detectedReason: `Possible spam detected: "${word}"`,
          isHardBlock: false,
        };
      }
    }

    const suspiciousPatterns = [
      /\d{4,}/g, // 4+ consecutive digits (phone numbers, amounts)
      /[A-Z]{4,}/g, // 4+ consecutive caps (URGENT, FREE)
      /(.)\1{3,}/g, // Repeated characters (!!!!, aaaa)
    ];

    for (const pattern of suspiciousPatterns) {
      if (pattern.test(messageText)) {
        return { isPossibleSpam: true, detectedReason: 'Suspicious formatting detected', isHardBlock: false };
      }
    }

    return {
      isPossibleSpam: false,
      detectedReason: '',
      isHardBlock: false,
    };
  }

  async function handleSubmit() {
    if (!validateForm()) return;

    const { isPossibleSpam, detectedReason, isHardBlock } = checkForSpam();

    if (isPossibleSpam && isHardBlock) {
      submitMessage = 'Submission blocked: ' + detectedReason;
      isSubmitSuccess = false;

      return;
    }

    isSubmitting = true;
    submitMessage = '';

    try {
      const submissionData = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        timestamp: Date.now(),
        spamAnalysis: {
          isPossibleSpam,
          detectedReason,
          isHardBlock,
        },
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      submitMessage = 'Thank you! Your message has been sent successfully.';
      isSubmitSuccess = true;

      formData = {
        name: '',
        email: '',
        message: '',
        honeypot: '',
        timestamp: 0,
      };
    } catch (error) {
      submitMessage = 'Sorry, there was an error sending your message. Please try again.';
      isSubmitSuccess = false;
    } finally {
      isSubmitting = false;
    }
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="w-full p-6">
  <h1 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-2 font-bold">Get In Touch</h1>

  <!-- Honeypot field (hidden from users, visible to bots) -->
  <div class="hidden">
    <label for="honeypot">Leave this field empty:</label>
    <input type="text" id="honeypot" name="honeypot" bind:value={formData.honeypot} tabindex="-1" autocomplete="off" />
  </div>

  <div class="flex flex-col md:flex-row md:space-x-4">
    <div class="md:w-1/2">
      <label for="name" class="block text-sm font-medium text-zinc-500 dark:text-gray-300 mb-2 mt-4">Name</label>
      <input
        type="text"
        id="name"
        bind:value={formData.name}
        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-zinc-500"
        class:border-red-500={errors.name}
        placeholder="John Doe"
        autocomplete="off"
        required
      />
      {#if errors.name}
        <p class="text-red-500 text-sm mt-1">{errors.name}</p>
      {/if}
    </div>

    <div class="mt-4 md:mt-4 md:w-1/2">
      <label for="email" class="block text-sm font-medium text-zinc-500 dark:text-gray-300 mb-2">
        Email (optional)
      </label>
      <input
        type="email"
        id="email"
        placeholder="hi@example.com"
        bind:value={formData.email}
        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-zinc-500"
        class:border-red-500={errors.email}
      />
      {#if errors.email}
        <p class="text-red-500 text-sm mt-1">{errors.email}</p>
      {/if}
    </div>
  </div>

  <div class="mt-4">
    <div class="flex justify-between items-center mb-2">
      <label for="message" class="block text-sm font-medium text-zinc-500 dark:text-gray-300">Message</label>
      <span class="text-xs text-zinc-400" class:text-red-500={remainingChars < 50}>
        {remainingChars} characters remaining
      </span>
    </div>
    <textarea
      id="message"
      bind:value={formData.message}
      rows="5"
      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-zinc-500"
      class:border-red-500={errors.message}
      class:border-yellow-400={remainingChars < 50 && !errors.message}
      placeholder="Your message..."
      maxlength={MAX_MESSAGE_LENGTH}
      required
    ></textarea>
    {#if errors.message}
      <p class="text-red-500 text-sm mt-1">{errors.message}</p>
    {/if}
  </div>

  <button
    type="submit"
    disabled={isSubmitting || !isFormValid}
    class="mt-6 w-full py-2 px-4 rounded-md transition duration-100 text-white"
    class:bg-zinc-600={isFormValid && !isSubmitting}
    class:hover:bg-zinc-700={isFormValid && !isSubmitting}
    class:bg-zinc-400={!isFormValid || isSubmitting}
    class:cursor-not-allowed={!isFormValid || isSubmitting}
  >
    {#if isSubmitting}
      <span class="flex items-center justify-center">
        <svg
          class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Sending...
      </span>
    {:else}
      Send Message
    {/if}
  </button>

  {#if submitMessage}
    <div
      class="mt-4 p-3 rounded-md"
      class:bg-green-100={isSubmitSuccess}
      class:text-green-700={isSubmitSuccess}
      class:bg-red-100={!isSubmitSuccess}
      class:text-red-700={!isSubmitSuccess}
    >
      {submitMessage}
    </div>
  {/if}
</form>

<style>
  .hidden {
    position: absolute;
    left: -9999px;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }
</style>
