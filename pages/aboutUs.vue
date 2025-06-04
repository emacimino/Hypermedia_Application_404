<template>
  <div v-if="aboutUsContent">
    <Presentation
        :title="currentLang === 'it' ? aboutUsContent.Title_it : aboutUsContent.Title"
        :paragraphs="currentLang === 'it' ? aboutUsContent.Paragraph_it : aboutUsContent.Paragraph"
        :image="aboutUsContent.Image"
        :reverse="true"
    />
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>


  <div :class="$style.timeline">
    <div :class="[$style.timeline__event, $style['timeline__event--type1'], $style['timeline__event--fade'], $style['delay-3s']]">
      <div :class="$style.timeline__event__icon"><i class="lni lni-cake"></i></div>
      <div :class="$style.timeline__event__date">20-08-2019</div>
      <div :class="$style.timeline__event__content">
        <div :class="$style.timeline__event__title">Birthday</div>
        <div :class="$style.timeline__event__description"><p>Lorem ipsum dolor sit amet...</p></div>
      </div>
    </div>

    <div :class="[$style.timeline__event, $style['timeline__event--type2'], $style['timeline__event--fade'], $style['delay-2s']]">
      <div :class="$style.timeline__event__icon"><i class="lni lni-burger"></i></div>
      <div :class="$style.timeline__event__date">20-08-2019</div>
      <div :class="$style.timeline__event__content">
        <div :class="$style.timeline__event__title">Lunch</div>
        <div :class="$style.timeline__event__description"><p>Lorem ipsum dolor sit amet...</p></div>
      </div>
    </div>

    <div :class="[$style.timeline__event, $style['timeline__event--type3'], $style['timeline__event--fade'], $style['delay-1s']]">
      <div :class="$style.timeline__event__icon"><i class="lni lni-slim"></i></div>
      <div :class="$style.timeline__event__date">20-08-2019</div>
      <div :class="$style.timeline__event__content">
        <div :class="$style.timeline__event__title">Exercise</div>
        <div :class="$style.timeline__event__description"><p>Lorem ipsum dolor sit amet...</p></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAsyncData } from '#app'
import { useSupabaseClient } from '#imports'
import { useLanguage } from '~/composables/useLanguage'
import Presentation from '~/components/presentation.vue'

const { currentLang } = useLanguage()
const supabase = useSupabaseClient()

interface PresentationContent {
  id: number
  Title: string
  Paragraph: string
  Image: string
  Title_it: string
  Paragraph_it: string
}

const { data: aboutUsContent } = await useAsyncData<PresentationContent | null>('aboutUs', async () => {
  const { data, error } = await supabase
      .from('Presentation')
      .select('*')
      .eq('Id', 3)
      .single()

  if (error) console.error('Errore Supabase:', error)
  return data
})
</script>

<style module>
.timeline {
  display: flex;
  flex-direction: column;
  margin: 20px auto;
  position: relative;
}

.timeline__event {
  margin: 20px 0;
  position: relative;
  display: flex;
  border-radius: 6px;
  align-self: center;
  width: 50vw;
}

.timeline__event:nth-child(2n + 1) {
  flex-direction: row-reverse;
}

.timeline__event:nth-child(2n + 1) .timeline__event__date {
  border-radius: 0 6px 6px 0;
}

.timeline__event:nth-child(2n + 1) .timeline__event__content {
  border-radius: 6px 0 0 6px;
}

.timeline__event:nth-child(2n + 1) .timeline__event__icon::before {
  content: "";
  width: 2px;
  height: 100%;
  background: #f6a4ec;
  position: absolute;
  top: 0%;
  left: 50%;
  z-index: -1;
  transform: translateX(-50%);
  animation: fillTop 2s forwards 4s ease-in-out;
}

.timeline__event:nth-child(2n + 1) .timeline__event__icon::after {
  content: "";
  width: 100%;
  height: 2px;
  background: #f6a4ec;
  position: absolute;
  right: 0;
  z-index: -1;
  top: 50%;
  transform: translateY(-50%);
  animation: fillLeft 2s forwards 4s ease-in-out;
}

.timeline__event__title {
  font-size: 1.2rem;
  line-height: 1.4;
  text-transform: uppercase;
  font-weight: 600;
  color: #9251ac;
  letter-spacing: 1.5px;
}

.timeline__event__content {
  padding: 20px;
  box-shadow: 0 30px 60px -12px rgba(50, 50, 93, 0.25),
  0 18px 36px -18px rgba(0, 0, 0, 0.3),
  0 -12px 36px -8px rgba(0, 0, 0, 0.025);
  background: #fff;
  width: calc(40vw - 84px);
  border-radius: 0 6px 6px 0;
}

.timeline__event__date {
  color: #f6a4ec;
  font-size: 1.5rem;
  font-weight: 600;
  background: #9251ac;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  padding: 0 20px;
  border-radius: 6px 0 0 6px;
}

.timeline__event__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9251ac;
  padding: 40px;
  align-self: center;
  margin: 0 20px;
  background: #f6a4ec;
  border-radius: 100%;
  width: 40px;
  height: 40px;
  box-shadow: 0 30px 60px -12px rgba(50, 50, 93, 0.25),
  0 18px 36px -18px rgba(0, 0, 0, 0.3),
  0 -12px 36px -8px rgba(0, 0, 0, 0.025);
  position: relative;
}

.timeline__event__icon i {
  font-size: 32px;
}

.timeline__event__icon::before {
  content: "";
  width: 2px;
  height: 100%;
  background: #f6a4ec;
  position: absolute;
  top: 0%;
  z-index: -1;
  left: 50%;
  transform: translateX(-50%);
  animation: fillTop 2s forwards 4s ease-in-out;
}

.timeline__event__icon::after {
  content: "";
  width: 100%;
  height: 2px;
  background: #f6a4ec;
  position: absolute;
  left: 0%;
  z-index: -1;
  top: 50%;
  transform: translateY(-50%);
  animation: fillLeftOdd 2s forwards 4s ease-in-out;
}

.timeline__event__description {
  flex-basis: 60%;
}

.timeline__event--type2 .timeline__event__date {
  color: #87bbfe;
  background: #555ac0;
}

.timeline__event--type2 .timeline__event__icon {
  background: #87bbfe;
  color: #555ac0;
}

.timeline__event--type2 .timeline__event__icon::before,
.timeline__event--type2 .timeline__event__icon::after {
  background: #87bbfe;
}

.timeline__event--type2 .timeline__event__title {
  color: #555ac0;
}

.timeline__event--type3 .timeline__event__date {
  color: #aff1b6;
  background-color: #24b47e;
}

.timeline__event--type3 .timeline__event__icon {
  background: #aff1b6;
  color: #24b47e;
}

.timeline__event--type3 .timeline__event__icon::before,
.timeline__event--type3 .timeline__event__icon::after {
  background: #aff1b6;
}

.timeline__event--type3 .timeline__event__title {
  color: #24b47e;
}

.timeline__event:last-child .timeline__event__icon::before {
  content: none;
}

/* Mobile */
@media (max-width: 786px) {
  .timeline__event {
    flex-direction: column;
    align-self: center;
  }

  .timeline__event__content {
    width: 100%;
  }

  .timeline__event__icon {
    border-radius: 6px 6px 0 0;
    width: 100%;
    margin: 0;
    box-shadow: none;
  }

  .timeline__event__icon::before,
  .timeline__event__icon::after {
    display: none;
  }

  .timeline__event__date {
    border-radius: 0;
    padding: 20px;
  }

  .timeline__event:nth-child(2n + 1) {
    flex-direction: column;
    align-self: center;
  }

  .timeline__event:nth-child(2n + 1) .timeline__event__date {
    border-radius: 0;
    padding: 20px;
  }

  .timeline__event:nth-child(2n + 1) .timeline__event__icon {
    border-radius: 6px 6px 0 0;
    margin: 0;
  }
}

/* Animazioni */
@keyframes fillLeft {
  100% {
    right: 100%;
  }
}

@keyframes fillTop {
  100% {
    top: 100%;
  }
}

@keyframes fillLeftOdd {
  100% {
    left: 100%;
  }
}
</style>
