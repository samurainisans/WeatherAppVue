<script>
import { ref } from 'vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import axios from 'axios'

export default {
  components: {
    InputText,
    PButton: Button
  },
  setup() {
    const apiKey = 'd40cd2ab99541a8c74178e4cae461a6a'
    const city = ref('')
    const weather = ref(null)
    const currentDate = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    const handleEnterKey = async () => {
      if (city.value) {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`
          )
          weather.value = {
            temperature: response.data.main.temp,
            description: response.data.weather[0].main,
            icon: response.data.weather[0].icon
          }
        } catch (error) {
          console.error('Error fetching weather data:', error)
          weather.value = null
        }
      }
    }

    return {
      city,
      weather,
      handleEnterKey,
      currentDate
    }
  }
}
</script>

<template>
  <div class="weather-card">
    <div class="search-bar">
      <InputText
        v-model="city"
        placeholder="Enter a city name"
        class="search-input"
        @keyup.enter="handleEnterKey"
      />
      <PButton icon="pi pi-search" class="search-button" @click="handleEnterKey" />
    </div>
    <div v-if="weather" class="weather-details">
      <div class="temperature">{{ weather.temperature }} °C</div>
      <div class="weather-description">
        <span>{{ weather.description }}</span>
      </div>
      <div class="location-date">
        <span class="location">{{ city }}</span>
        <span class="divider"> | </span>
        <span class="date">{{ currentDate }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.weather-card {
  display: flex;
  flex-direction: column;
  background: linear-gradient(to bottom, #6e48aa, #0d0311);
  padding: 1rem;
  border-radius: 20px;
  color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 360px;
  margin: 1rem auto;

  .search-bar {
    display: flex;
    justify-content: space-between;
    .search-input {
      color: black;
      border-radius: 12px;
      padding: 5px 10px;
    }
    .search-button {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      border-radius: 20px;

      &:hover {
        background-color: rgba(255, 255, 255, 0.2);
        border: none;
        color: #6e48aa;
      }
    }

    input {
      flex: 1;
      margin-right: 0.5rem;
    }
  }

  .weather-details {
    text-align: center;

    .temperature {
      font-size: 2.5rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
    }

    .weather-description {
      font-size: 1.2rem;
      margin-bottom: 1rem;

      .weather-icon {
        margin-right: 0.5rem;
      }
    }

    .location-date {
      font-size: 1rem;
      .location {
        font-weight: bold;
      }
      .date {
        font-style: italic;
      }
    }
  }
}
</style>
