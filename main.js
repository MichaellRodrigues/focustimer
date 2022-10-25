const buttonPlay = document.querySelector('.play')
const buttonStop = document.querySelector('.stop')
const buttonPause = document.querySelector('.pause')
const buttonSet = document.querySelector('.set')
const buttonUp = document.querySelector('.up')
const buttonDown = document.querySelector('.down')
let minutes
const minutesDisplay = document.querySelector('.minutes')
const secondsDisplay = document.querySelector('.seconds')
const buttonFlorest = document.querySelector('.florest')
const buttonRain = document.querySelector('.rain')
const buttonCofe = document.querySelector('.cofe')
const buttonFire = document.querySelector('.fire')

function resetControls() {
  buttonPlay.classList.remove('hide')
  buttonPause.classList.add('hide')
  buttonSet.classList.remove('hide')
  buttonStop.classList.add('hide')
}

function updateTimerDisplay(minutes, seconds) {
  minutesDisplay.textContent = String(minutes).padStart(2, '0')
  secondsDisplay.textContent = String(seconds).padStart(2, '0')
}

function resetTimer() {
  updateTimerDisplay(minutes, 0)
  clearTimeout(timerTimeOut)
}

function countdown() {
  timerTimeOut = setTimeout(function () {
    let seconds = Number(secondsDisplay.textContent)
    let minutes = Number(minutesDisplay.textContent)

    updateTimerDisplay(minutes, 0)

    if (minutes <= 0) {
      resetControls()
      return
    }

    if (seconds <= 0) {
      seconds = 60
      --minutes
    }

    updateTimerDisplay(minutes, String(seconds - 1))

    countdown()
  }, 1000)
}

buttonPlay.addEventListener('click', function () {
  buttonPlay.classList.add('hide')
  buttonPause.classList.remove('hide')
  buttonSet.classList.add('hide')
  buttonStop.classList.remove('hide')

  countdown()
})

buttonPause.addEventListener('click', function () {
  buttonPlay.classList.remove('hide')
  buttonPause.classList.add('hide')
  clearTimeout(timerTimeOut)
})

buttonStop.addEventListener('click', function () {
  resetControls()
  resetTimer()
})

buttonSet.addEventListener('click', function () {
  let newMinutes = prompt('Quantos minutos?')
  if (!newMinutes) {
    resetTimer()
    return
  }

  minutes = newMinutes
  updateTimerDisplay(minutes, 0)
})

buttonUp.addEventListener('click', function () {
  incrementTimer()
})

buttonDown.addEventListener('click', function () {
  minutes = Number(minutes - 5)
  updateTimerDisplay(minutes, 0)
})

buttonFlorest.addEventListener('click', function () {
  bgAudioFlorest.play()
  bgAudioCofe.pause()
  bgAudioFire.pause()
  bgAudioRain.pause()
})

buttonRain.addEventListener('click', function () {
  bgAudioRain.play()
  bgAudioFlorest.pause()
  bgAudioCofe.pause()
  bgAudioFire.pause()
})

buttonCofe.addEventListener('click', function () {
  bgAudioCofe.play()
  bgAudioFlorest.pause()
  bgAudioFire.pause()
  bgAudioRain.pause()
})

buttonFire.addEventListener('click', function () {
  bgAudioFire.play()
  bgAudioRain.pause()
  bgAudioCofe.pause()
  bgAudioFlorest.pause()
})

const bgAudioFlorest = new Audio('assets/Floresta.wav')
const bgAudioRain = new Audio('assets/Chuva.wav')
const bgAudioCofe = new Audio('assets/Cafeteria.wav')
const bgAudioFire = new Audio('assets/Fire.wav')

bgAudioFlorest.loop = true
bgAudioRain.loop = true
bgAudioCofe.loop = true
bgAudioFire.loop = true

const incrementTimer = () => {
  minutes = minutes < 60 ? Number(minutes) + 5 : (minutes = 5)
  updateTimerDisplay(minutes, 0)
}

const decrementTimer = () => {
  minutes = minutes > 5 ? Number(minutes) - 5 : (minutes = 0)
  updateTimerDisplay(minutes, 0)
}
