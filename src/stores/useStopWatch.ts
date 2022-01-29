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
      selectedSW.value.isOn = !selectedSW.value.isOn
      function foo() {
        let x
        if (selectedSW.value?.isOn) {
          stopWatchLogic(Id)
          x = setTimeout(foo, 1000)
        }
        else {
          clearTimeout(x)
        }
      }
      foo()
    }
  }

  function showTime(Id = 'default') {
    // selectedSW => selected StopWatch
    const selectedSW = ref(swl.value.find(val => val.id === Id))
    if (selectedSW.value)
      return `${selectedSW.value.hr}:${selectedSW.value.min}:${selectedSW.value.sec}`
  }

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

  function showTest() {
    newStopWatch('test', 23, 58, 50, false)
    toggleOnOff('test')
  }

  return {
    newStopWatch,
    showTime,
    toggleOnOff,
    showTest,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useStopWatch, import.meta.hot))
