<template>
  <div :class="$style.subscription">
    <div :class="$style.subscribe">{{currentLang == 'it' ? 'Iscriviti' : 'Subscribe'}}</div>
    <form @submit.prevent="submitForm" :class="$style.form">
      <div :class="$style.row">
        <div :class="$style.input">
          <div :class="$style.firstName">{{currentLang == 'it' ? 'Nome' : 'First name'}} *</div>
          <div :class="[$style.field, errors.firstName && $style.fieldError]">
            <input
                v-model="formData.firstName"
                type="text"
                placeholder="Jane"
                :class="[$style.inputField, 'placeholder-blue-500 focus:placeholder-blue-600']"
                required
            />
          </div>
          <div v-if="errors.firstName" :class="$style.error">{{ errors.firstName }}</div>
        </div>

        <div :class="$style.input1">
          <div :class="$style.firstName">{{currentLang == 'it' ? 'Cognome' : 'Last name'}} *</div>
          <div :class="[$style.field, errors.lastName && $style.fieldError]">
            <input
                v-model="formData.lastName"
                type="text"
                placeholder="Smitherton"
                :class="[$style.inputField, 'placeholder-blue-500 focus:placeholder-blue-600']"
                required
            />
          </div>
          <div v-if="errors.lastName" :class="$style.error">{{ errors.lastName }}</div>
        </div>
      </div>

      <div :class="$style.row">
        <div :class="$style.input2">
          <div :class="$style.firstName">{{currentLang == 'it' ? 'Indirizzo email' : 'Email address'}} *</div>
          <div :class="[$style.field, errors.email && $style.fieldError]">
            <input
                v-model="formData.email"
                type="email"
                placeholder="email@janesfakedomain.net"
                :class="[$style.inputField, 'placeholder-blue-500 focus:placeholder-blue-600']"
                required
            />
          </div>
          <div v-if="errors.email" :class="$style.error">{{ errors.email }}</div>
        </div>
      </div>

      <div :class="$style.row">
        <div :class="$style.input3">
          <div :class="$style.firstName">{{currentLang == 'it' ? 'Il tuo messaggio' : 'Your message'}}</div>
          <div :class="[$style.field, $style.fieldTextarea]">
            <textarea
                v-model="formData.message"
                :placeholder="currentLang === 'it' ? 'Inserisci la tua domanda' : 'Enter your question or message'"
                :class="[$style.inputField, 'placeholder-blue-500 focus:placeholder-blue-600',$style.textarea]"
                rows="5"
            ></textarea>
          </div>
        </div>
      </div>

      <button
          type="submit"
          class="w-full py-3 text-3xl bg-blue-300 text-white rounded shadow hover:bg-blue-400 hover:scale-105 active:scale-105 active:bg-blue-400 transition disabled:bg-slate-400 disabled:cursor-not-allowed"
          :disabled="isSubmitting"
      >
        {{ isSubmitting
          ? (currentLang === 'it' ? 'Invio in corso...' : 'Submitting...')
          : (currentLang === 'it' ? 'Invia' : 'Submit')
        }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from 'vue'
import {useSupabaseClient} from '#imports'
import { useLanguage } from '~/composables/useLanguage'

const { currentLang } = useLanguage()
const supabase = useSupabaseClient()

const prop = defineProps<{
  Title: string
}>()

const formData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  message: '',
  type: prop.Title
})

const isSubmitting = ref(false)
const errors = reactive({
  firstName: '',
  lastName: '',
  email: '',
})

const validateForm = () => {
  errors.firstName = ''
  errors.lastName = ''
  errors.email = ''

  let isValid = true

  if (!formData.firstName.trim()) {
    errors.firstName = 'First name is required'
    isValid = false
  }
  if (!formData.lastName.trim()) {
    errors.lastName = 'Last name is required'
    isValid = false
  }
  if (!formData.email.trim()) {
    errors.email = 'Email is required'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Please enter a valid email address'
    isValid = false
  }

  return isValid
}

const submitForm = async () => {
  if (!validateForm()) return

  isSubmitting.value = true

  try {
    const { error } = await (supabase as any)
        .from('Subscription')
        .insert([{
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          message: formData.message,
          type: formData.type
        }])

    if (error) throw error

    alert('Form inviato con successo!')
    formData.firstName = ''
    formData.lastName = ''
    formData.email = ''
    formData.message = ''
  } catch (error) {
    alert('Errore durante l\'invio del form. Riprova.')
    console.error('Supabase error:', error)
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
.submit {
  position: relative;
  line-height: 150%;
  font-weight: 500;
}
.button {
  width: 100%;
  border-radius: 8px;
  background-color: #7ec8e3;
  color: white;
  padding: 16px 32px;
  font-size: 20px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.button:hover:not(.buttonDisabled) {
  background-color: #60a5fa;
}

.buttonDisabled {
  background-color: #94a3b8;
  cursor: not-allowed;
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