import { acceptHMRUpdate, defineStore } from 'pinia'

export const useDateSW = defineStore('date-stopwatch', () => {
  const stopwatchList = ref([
    {
      id: 'default',
      pause: true,
      startDate: Date.now(),
      sw: '',
    },
  ])

  function createNewStopwatch(Id = `Stopwatch ${stopwatchList.value.length}`) {
    const selectedStopwatch = ref(stopwatchList.value.find(sw => sw.id === Id))
    if (!selectedStopwatch.value) {
      stopwatchList.value.push({
        id: Id,
        pause: true,
        startDate: Date.now(),
        sw: '',
      })
    }
    else { return 'There is another stopwatch with this name.' }
  }

  function getSecs(oldDate: number) {
    const t1 = oldDate
    const t2 = Date.now()
    const sum = (t2 - t1) / 1000
    const Secs = Number(sum.toFixed(0))
    return Secs
  }

  function secsToTime(secs: number) {
    const d = secs / 8.64e4 | 0
    const H = (secs % 8.64e4) / 3.6e3 | 0
    const m = (secs % 3.6e3) / 60 | 0
    const s = secs % 60
    const z = (n: number) => (n < 10 ? '0' : '') + n
    if (d === 0) return `${z(H)}:${z(m)}:${z(s)}`
    else return `${d} Days and ${z(H)}:${z(m)}:${z(s)}`
  }

  function updateStopwatch(Id = 'default') {
    const selectedStopwatch = ref(stopwatchList.value.find(sw => sw.id === Id))
    if (selectedStopwatch.value) {
      const secs = ref(getSecs(selectedStopwatch.value.startDate))
      const time = ref(secsToTime(secs.value))
      selectedStopwatch.value.sw = time.value
    }
    else { return 'There is no stopwatch with this name' }
  }

  function togglePause(Id = 'default') {
    const selectedStopwatch = ref(stopwatchList.value.find(sw => sw.id === Id))
    if (selectedStopwatch.value) {
      selectedStopwatch.value.pause = !selectedStopwatch.value.pause
      function foo() {
        let x
        if (!selectedStopwatch.value?.pause) {
          updateStopwatch(Id)
          x = setTimeout(foo, 1000)
        }
        else {
          clearTimeout(x)
        }
      }
      foo()
    }
  }

  function showStopwatch(Id = 'default') {
    const selectedStopwatch = ref(stopwatchList.value.find(sw => sw.id === Id))
    if (selectedStopwatch.value) return selectedStopwatch.value.sw
  }

  return {
    createNewStopwatch,
    togglePause,
    showStopwatch,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useDateSW, import.meta.hot))
