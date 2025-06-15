<template>
  <div class="bg-blue-100" :class="$style.barraFooter">
    <div :class="$style.footerContainer">
      <div :class="$style.leftColumn">
        <div :class="$style.whiteLotusCenter">White Lotus Center</div>
        <div :class="$style.socialIcon">
          <a
              href="https://www.facebook.com"
              target="_blank"
              :aria-label="currentLang === 'en' ? 'Visit our Facebook profile' : 'Visita il nostro profilo Facebook'"
              role="link"
          >
            <Icon name="mdi:facebook" :class="$style.responsiveIcon" />
          </a>
          <a
              href="https://www.instagram.com"
              target="_blank"
              :aria-label="currentLang === 'en' ? 'Visit our Instagram profile' : 'Visita il nostro profilo Instagram'"
              role="link"
          >
            <Icon name="mdi:instagram" :class="$style.responsiveIcon" />
          </a>
          <a
              href="https://www.youtube.com"
              target="_blank"
              :aria-label="currentLang === 'en' ? 'Visit our YouTube profile' : 'Visita il nostro profilo YouTube'"
              role="link"
          >
            <Icon name="mdi:youtube" :class="$style.responsiveIcon" />
          </a>
        </div>
      </div>

      <div :class="$style.centerColumn">
        <div>{{currentLang === 'en' ? 'Reach out to us whenever you need:' : 'Contattaci per qualsiasi cosa:'}}</div>
        <div class="flex items-center gap-2">
          <MapPinIcon class="w-[1.5vw] h-[1.5vw] text-brand-500" />
          <span>
    {{currentLang === 'en' ? 'Via Privata Siracusa, Milan' : 'Via Privata Siracusa, Milano'}}
  </span>
          <div class="flex items-center gap-2">
            <PhoneIcon class="w-[1.5vw] h-[1.5vw] text-brand-500" />
            <span>+39 345 678 9012</span>
          </div>
          <EnvelopeIcon class="w-[1.5vw] h-[1.5vw] text-brand-500" />
          <a href="mailto:info@whitelotus.com" :class="$style.emailLink">info@whitelotus.com</a>
        </div>


      </div>

      <div :class="$style.rightColumn">
        <div>Credits: Gabriele Lorenzetti, Emanuele Cimino, Giorgio Sidari</div>
        <div>@2025 WhiteLotus, All rights reserved</div>
      </div>

    </div>
  </div>
</template>


<script setup lang="ts">
import {useLanguage} from "~/composables/useLanguage.js";
import { MapPinIcon } from '@heroicons/vue/24/solid'
import { PhoneIcon } from '@heroicons/vue/24/outline'
import { EnvelopeIcon } from '@heroicons/vue/24/outline'

const { currentLang } = useLanguage()
</script>

<style module>
.barraFooter {
  width: 100%;
  box-sizing: border-box;
}
.footerContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2vw;
  height: 9rem;
  box-sizing: border-box;
}
.leftColumn {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.whiteLotusCenter {
  font-size: 2rem;
  line-height: 150%;
}
.socialIcon {
  display: flex;
  gap: 1rem;
}
.responsiveIcon {
  font-size: 2rem;
  transition: transform 0.2s ease;
}
.responsiveIcon:hover {
  transform: scale(1.25);
}
.centerColumn {
  display: flex;
  flex-direction: column;
  text-align: center;
}
.emailLink {
  text-decoration: underline;
  color: inherit;
}
.emailLink:hover {
  color: #1d4ed8;
}
.rightColumn {
  display: flex;
  flex-direction: column;
  text-align: center;
}


@media (max-width: 768px) {
  .footerContainer {
    flex-direction: column;
    align-items: center;
    height: auto;
    gap: 1rem;
  }
  .socialIcon {
    justify-content: center;
  }
  .whiteLotusCenter {
    font-size: 1.75rem;
  }
  .responsiveIcon {
    font-size: 1.75rem;
  }
}


@media (min-width: 2560px){
  .footerContainer {
    height: 15rem;
  }
  .whiteLotusCenter {
    font-size: 3.5rem;
  }
  .responsiveIcon {
    font-size: 3.5rem;
  }
  .centerColumn {
    font-size: 2rem;
  }
  .rightColumn {
    font-size: 2rem;
  }
}
</style>
