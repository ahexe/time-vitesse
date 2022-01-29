import { acceptHMRUpdate, defineStore } from 'pinia'

export const useStopWatch = defineStore('stop-watch', () => {
  // swl => StopWatches List
  const swl = ref([
    {
      id: 'default',
      hr: 0,
      min: 0,
      sec: 0,
      isOn: false,
    },
  ])

  function newStopWatch(
    Id = `Stopwatch ${swl.value.length}`,
    Hr = 0,
    Min = 0,
    Sec = 0,
    IsOn = false,
  ) {
    swl.value.push({
      id: Id,
      hr: Hr,
      min: Min,
      sec: Sec,
      isOn: IsOn,
    })
  }

  function stopWatchLogic(Id = 'default') {
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

  function toggleOnOff(Id = 'default') {
    // selectedSW => selected StopWatch
    const selectedSW = ref(swl.value.find(val => val.id === Id))
    if (selectedSW.value) {
      const interval = ref()
      selectedSW.value.isOn = !selectedSW.value.isOn
      if (selectedSW.value.isOn)
        interval.value = setInterval(stopWatchLogic, 1000, Id)
      else
        clearInterval(interval.value)
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
    showTime,
    toggleOnOff,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useStopWatch, import.meta.hot))
