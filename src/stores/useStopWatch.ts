import { acceptHMRUpdate, defineStore } from 'pinia'

export const useStopWatch = defineStore('stop-watch', () => {
  // swl => StopWatches List
  const swl = ref([
    {
      id: 'default',
      hr: 0,
      min: 0,
      sec: 0,
    },
  ])

  function newStopWatch(
    Id = String(Date.now()),
    Hr = 0,
    Min = 0,
    Sec = 0,
  ) {
    swl.value.push({
      id: Id,
      hr: Hr,
      min: Min,
      sec: Sec,
    })
  }

  function startStopWatch(Id = 'default') {
    // selectedSW => selected StopWatch
    const selectedSW = ref(swl.value.find(val => val.id === Id))
    if (selectedSW.value) {
      selectedSW.value.sec++
      if (selectedSW.value.sec === 60) {
        selectedSW.value.min++
        selectedSW.value.sec = 0
        if (selectedSW.value.min === 60) {
          selectedSW.value.hr++
          selectedSW.value.min = 0
        }
      }
    }
  }

  const showTime = computed((Id = 'default') => {
    // selectedSW => selected StopWatch
    const selectedSW = ref(swl.value.find(val => val.id === Id))
    if (selectedSW.value)
      return `${selectedSW.value.hr}:${selectedSW.value.min}:${selectedSW.value.sec}`
  })

  // coolTimer(): string {
  //   let sec = String(this.seconds);
  //   let min = String(this.minutes);
  //   let hr = String(this.hours);
  //   if (this.seconds < 10) {
  //     sec = "0" + this.seconds;
  //   }
  //   if (this.minutes < 10) {
  //     min = "0" + this.minutes;
  //   }
  //   if (this.hours < 10) {
  //     hr = "0" + this.hours;
  //   }
  //   return hr + ":" + min + ":" + sec;
  // }

  return {
    swl,
    newStopWatch,
    startStopWatch,
    showTime,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useStopWatch, import.meta.hot))
