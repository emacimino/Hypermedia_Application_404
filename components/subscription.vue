<template>
  <div :class="$style.subscription">
    <div :class="$style.subscribe">Subscribe</div>
    <form @submit.prevent="submitForm" :class="$style.form">
      <div :class="$style.row">
        <div :class="$style.input">
          <div :class="$style.firstName">First name *</div>
          <div :class="[$style.field, errors.firstName && $style.fieldError]">
            <input
                v-model="formData.firstName"
                type="text"
                placeholder="Jane"
                :class="$style.inputField"
                required
            />
          </div>
          <div v-if="errors.firstName" :class="$style.error">{{ errors.firstName }}</div>
        </div>

        <div :class="$style.input1">
          <div :class="$style.firstName">Last name *</div>
          <div :class="[$style.field, errors.lastName && $style.fieldError]">
            <input
                v-model="formData.lastName"
                type="text"
                placeholder="Smitherton"
                :class="$style.inputField"
                required
            />
          </div>
          <div v-if="errors.lastName" :class="$style.error">{{ errors.lastName }}</div>
        </div>
      </div>

      <div :class="$style.row">
        <div :class="$style.input2">
          <div :class="$style.firstName">Email address *</div>
          <div :class="[$style.field, errors.email && $style.fieldError]">
            <input
                v-model="formData.email"
                type="email"
                placeholder="email@janesfakedomain.net"
                :class="$style.inputField"
                required
            />
          </div>
          <div v-if="errors.email" :class="$style.error">{{ errors.email }}</div>
        </div>
      </div>

      <div :class="$style.row">
        <div :class="$style.input3">
          <div :class="$style.firstName">Your message</div>
          <div :class="[$style.field, $style.fieldTextarea]">
            <textarea
                v-model="formData.message"
                placeholder="Enter your question or message"
                :class="[$style.inputField, $style.textarea]"
                rows="5"
            ></textarea>
          </div>
        </div>
      </div>

      <button
          type="submit"
          :class="[$style.button, isSubmitting && $style.buttonDisabled]"
          :disabled="isSubmitting"
      >
        <div :class="$style.submit">
          {{ isSubmitting ? 'Submitting...' : 'Submit' }}
        </div>
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from 'vue'

const prop = defineProps<{
  Title: string
}>()

const formData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  message: ''
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
    const subject = encodeURIComponent(`New subscription for ${prop.Title}`)
    const body = encodeURIComponent(
        `Name: ${formData.firstName}\n` +
        `Last name: ${formData.lastName}\n` +
        `Email: ${formData.email}\n` +
        `Message: ${formData.message}`
    )

    window.location.href = `mailto:gabriele.lorenzetti18@gmail.com?subject=${subject}&body=${body}`

    setTimeout(() => {
      formData.firstName = ''
      formData.lastName = ''
      formData.email = ''
      formData.message = ''
      alert('Form submitted successfully! Your email client should open.')
    }, 1000)

  } catch (error) {
    alert('Error submitting form. Please try again.')
    console.error('Form submission error:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style module>
.subscribe {
  align-self: stretch;
  position: relative;
  line-height: 120%;
  font-weight: 600;
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
  justify-content: flex-start;
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
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-family: inherit;
  font-size: inherit;
  line-height: 150%;
  font-weight: 500;
  color: #1f3a5f;
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
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  background-color: #0077b6;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 16px 32px;
  font-size: 20px;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.button:hover:not(.buttonDisabled) {
  background-color: #005a8b;
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
  max-width: 50vw;
  margin-left: auto;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 70px 99px 70px 106px;
  box-sizing: border-box;
  gap: 58px;
  text-align: left;
  font-size: 40px;
  color: #1f3a5f;
  font-family: Inter;
}
.row {
  display: flex;
  flex-direction: row;
  gap: 32px;
  width: 100%;
}
</style>