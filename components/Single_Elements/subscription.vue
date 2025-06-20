<template>
  <div :class="$style.subscription">
    <!-- Section title -->
    <div :class="$style.subscribe">{{ currentLang === 'it' ? 'Iscriviti' : 'Subscribe' }}</div>

    <!-- Subscription form -->
    <form @submit.prevent="submitForm" :class="$style.form">

      <!-- First row: first name and last name -->
      <div :class="$style.row">
        <div :class="$style.input">
          <div :class="$style.firstName">{{ currentLang === 'it' ? 'Nome' : 'First name' }} *</div>
          <div :class="[$style.field, errors.firstName && $style.fieldError]">
            <label for="firstName">{{ currentLang === 'it' ? 'Nome' : 'First name' }} *</label>
            <input
                id="firstName"
                v-model="formData.firstName"
                type="text"
                placeholder="Jane"
                required
                :class="[$style.inputField]"
            />
          </div>
          <div v-if="errors.firstName" :class="$style.error">{{ errors.firstName }}</div>
        </div>

        <!-- Last Name Field -->
        <div :class="$style.input1">
          <div :class="$style.firstName">{{ currentLang === 'it' ? 'Cognome' : 'Last name' }} *</div>
          <div :class="[$style.field, errors.lastName && $style.fieldError]">
            <label for="lastName">{{ currentLang === 'it' ? 'Cognome' : 'Last name' }} *</label>
            <input
                id="lastName"
                v-model="formData.lastName"
                type="text"
                placeholder="Smith"
                required
                :class="[$style.inputField]"
            />
          </div>
          <div v-if="errors.lastName" :class="$style.error">{{ errors.lastName }}</div>
        </div>
      </div>

      <!-- Second row: email -->
      <div :class="$style.row">
        <div :class="$style.input2">
          <div :class="$style.firstName">{{ currentLang === 'it' ? 'Email' : 'Email address' }} *</div>
          <div :class="[$style.field, errors.email && $style.fieldError]">
            <label for="email">{{ currentLang === 'it' ? 'Email' : 'Email address' }} *</label>
            <input
                id="email"
                v-model="formData.email"
                type="email"
                placeholder="email@domain.com"
                required
                :class="[$style.inputField]"
            />
          </div>
          <div v-if="errors.email" :class="$style.error">{{ errors.email }}</div>
        </div>
      </div>

      <!-- Third row: optional message -->
      <div :class="$style.row">
        <div :class="$style.input3">
          <div :class="$style.firstName">{{ currentLang === 'it' ? 'Messaggio' : 'Message' }}</div>
          <div :class="[$style.field, $style.fieldTextarea]">
            <label for="message">{{ currentLang === 'it' ? 'Messaggio' : 'Message' }}</label>
            <textarea
                id="message"
                v-model="formData.message"
                rows="5"
                :placeholder="currentLang === 'it' ? 'Inserisci la tua domanda' : 'Enter your message'"
                :class="[$style.inputField, $style.textarea]"
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Submit button -->
      <button
          type="submit"
          :disabled="isSubmitting"
          class="w-full py-3 text-3xl bg-blue-300 text-white rounded shadow hover:bg-blue-400 transition"
      >
        {{ isSubmitting
          ? (currentLang === 'it' ? 'Invio in corso...' : 'Submitting...')
          : (currentLang === 'it' ? 'Invia' : 'Submit') }}
      </button>
    </form>
  </div>
</template>


<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useSubscriptionStore } from '~/stores/activities/subscriptionStore'
import { useLanguage } from '~/composables/useLanguage'

const { currentLang } = useLanguage()

// Accept `Title` prop to assign the type of subscription
const prop = defineProps<{ Title: string }>()

// Reactive object to store form inputs
const formData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  message: '',
  type: prop.Title // comes from prop
})

const isSubmitting = ref(false)

// Stores validation error messages for each field
const errors = reactive({ firstName: '', lastName: '', email: '' })

// Validates required form fields
const validateForm = () => {
  errors.firstName = ''
  errors.lastName = ''
  errors.email = ''
  let isValid = true

  if (!formData.firstName.trim()) {
    errors.firstName = currentLang.value === 'it' ? 'Nome obbligatorio' : 'First name is required'
    isValid = false
  }
  if (!formData.lastName.trim()) {
    errors.lastName = currentLang.value === 'it' ? 'Cognome obbligatorio' : 'Last name is required'
    isValid = false
  }
  if (!formData.email.trim()) {
    errors.email = currentLang.value === 'it' ? 'Email obbligatoria' : 'Email is required'
    isValid = false
  }

  return isValid
}

// Handles form submission by sending data to the store
const submitForm = async () => {
  if (!validateForm()) return

  isSubmitting.value = true
  const store = useSubscriptionStore()

  try {
    // Call store action to submit form data via API
    await store.submitSubscription(formData)

    alert(currentLang.value === 'it' ? 'Form inviato con successo!' : 'Form submitted successfully!')

    Object.assign(formData, { firstName: '', lastName: '', email: '', message: '' })
  } catch (error) {
    alert(currentLang.value === 'it' ? 'Errore durante la registrazione' : 'Submission failed')
  } finally {
    isSubmitting.value = false
  }
}
</script>




<style module>
.subscribe {
  font-weight: bold;
  font-size: clamp(2rem, 4vw, 3rem);
}
.firstName {
  align-self: stretch;
  position: relative;
  line-height: 150%;
  font-weight: 500;
}
.field {
  align-self: stretch;
  flex: 1;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 12px 16px;
  transition: border-color 0.2s ease;
}
.field:focus-within {
  border-color: #0077b6;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), 0 0 0 3px rgba(0, 119, 182, 0.1);
}
.fieldError {
  border-color: #ef4444;
}
.fieldTextarea {
  padding: 12px 16px;
  min-height: 120px;
}
.inputField {
  flex: 1 1 auto;
  min-width: 0;
}
.inputField::placeholder {
  color: #7ec8e3;
}
.textarea {
  resize: vertical;
  font-family: inherit;
}
.error {
  color: #ef4444;
  font-size: 14px;
  margin-top: 4px;
  line-height: 120%;
}
.input {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 8px;
}
.input1 {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 8px;
}
.input2 {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 8px;
}
.input3 {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 8px;
}

.form {
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 24px;
  font-size: 16px;
}
.subscription {
  width: 100%;
  align-items: flex-start;
  text-align: left;
  font-size: 40px;
  color: #1f3a5f;
  font-family: Inter;
}
.row {
  display: flex;
  flex-direction: row;
  width: 100%;
}
</style>