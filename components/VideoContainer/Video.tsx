import { Component, createRef } from 'react'
import { StepData, zoneVideoMap } from '../../data/zoneData'
import classes from './index.module.scss'

export interface VideoProps {
  step: number
  zone: number
  steps: StepData[]
  /** Set video at specified time on component mount */
  videoLoadTime: number
  /** After a step's videoTime has been reached (after play()) */
  onTimeReached: () => void
}

/**
 * Set to -1 for componentDidMount to work with props.step === 0,
 * then currentStepNumber is used to prevent unnecessary processing
 * when clicking on the same step consecutively
 */
const initialStepNumber = -1

/**
 * Controls the HTML5 video element.
 * Loads two videos, the normal, and the reverse (to enable
 * selecting a previous brand and having a backwards animation,
 * as HTML5 doesn't have a cross-browser reverse play feature).
 */
export class Video extends Component<VideoProps> {
  videoRef: React.RefObject<HTMLVideoElement>
  reverseVideoRef: React.RefObject<HTMLVideoElement>

  currentStepNumber = initialStepNumber
  /** Used to track video time, and correctly play reversed video if needed */
  currentTime = 0

  constructor (props: VideoProps) {
    super(props)
    this.videoRef = createRef<HTMLVideoElement>()
    this.reverseVideoRef = createRef<HTMLVideoElement>()
  }

  get video (): HTMLVideoElement {
    // Existence of referenced element checked in lifecycle
    // methods through this.videosAreMounted
    return this.videoRef.current as HTMLVideoElement
  }

  get reverseVideo (): HTMLVideoElement {
    return this.reverseVideoRef.current as HTMLVideoElement
  }

  get activeVideo (): HTMLVideoElement {
    if (this.reverseIsShowing) return this.reverseVideo
    return this.video
  }

  get videosAreMounted (): boolean {
    return !!(this.reverseVideoRef.current && this.videoRef.current)
  }

  get reverseIsShowing (): boolean {
    return this.reverseVideo?.style.display === 'block'
  }

  showReverseVideo (): undefined {
    if (!this.reverseVideo || !this.video) return
    this.video.style.display = 'none'
    this.reverseVideo.style.display = 'block'
  }

  hideReverseVideo (): undefined {
    if (!this.reverseVideo || !this.video) return
    this.video.style.display = 'block'
    this.reverseVideo.style.display = 'none'
  }

  /**
   * Go to video time of the given step.
   * Detects if the given step's videoTime is larger, or smaller, than
   * the currentTime, and plays the correct video (normal, or reversed)
   * until the given step's videoTime is reached, than runs props.onTimeReached()
   */
  goToStep (stepNumber: number): undefined {
    // Prevent unnecessary processing
    if (this.currentStepNumber === stepNumber) return

    const step = this.props.steps[stepNumber]

    if (this.currentTime === step.videoTime) return

    this.activeVideo.pause()

    this.currentStepNumber = stepNumber

    // Video needs to be reversed
    if (this.currentTime < step.videoTime) {
      // Reduce chances of flickering when switching videos
      // by continuing after video time has been set
      const _continue = () => {
        // Component might be un-mounted
        if (!this.videosAreMounted) return
        this.video.play()
        this.video.ontimeupdate = () => {
          if (!this.video) return
          this.currentTime = this.video.currentTime
          if (this.currentTime >= step.videoTime) {
            this.video.pause()
            this.props.onTimeReached()
          }
        }
      }
      if (this.reverseIsShowing) {
        this.video.currentTime = this.video.duration - this.reverseVideo.currentTime
        this.video.ontimeupdate = () => {
          if (!this.videosAreMounted) return
          this.hideReverseVideo()
          requestAnimationFrame(_continue)
        }
      } else {
        _continue()
      }
    } else { // Video should continue playing (not reversed)
      const _continue = () => {
        if (!this.videosAreMounted) return
        this.reverseVideo.play()
        this.reverseVideo.ontimeupdate = () => {
          if (!this.videosAreMounted) return
          // If reversed video is playing, than current time is calculated using subtraction
          this.currentTime = this.video.duration - this.reverseVideo.currentTime
          if (this.currentTime <= step.videoTime) {
            this.reverseVideo.pause()
            this.props.onTimeReached()
          }
        }
      }
      // TODO: Correct reversing video time
      // /zone/4 - video stopping at incorrect time when reverse is played
      if (!this.reverseIsShowing) {
        this.reverseVideo.currentTime = this.reverseVideo.duration - this.video.currentTime
        this.reverseVideo.ontimeupdate = () => {
          if (!this.videosAreMounted) return
          this.showReverseVideo()
          requestAnimationFrame(_continue)
        }
      } else {
        _continue()
      }
    }
  }

  /**
   * Prevent re-rendering of video elements if props.zone hasn't changed
   */
  shouldComponentUpdate (nextProps: VideoProps): boolean {
    if (nextProps.step !== this.props.step) this.goToStep(nextProps.step)
    return false
  }

  componentDidMount (): undefined {
    if (!this.videosAreMounted) return
    this.video.currentTime = this.props.videoLoadTime
    this.goToStep(this.props.step)
  }

  /**
   * If the props.zone has changed, reset component
   */
  componentDidUpdate (): undefined {
    if (!this.videosAreMounted) return
    this.hideReverseVideo()
    this.video.load()
    this.reverseVideo.load()
    this.currentStepNumber = initialStepNumber
    this.currentTime = 0
    this.goToStep(this.props.step)
  }

  render (): JSX.Element {
    const zoneVideoSrc = zoneVideoMap[this.props.zone]
    if (!zoneVideoSrc) return <h1>Content Not Found</h1>
    return (
      <>
        {/**
         * Hiding using display property to prevent flickering when playing reverse
        */}
        <video className={`w-100 ${classes.video ?? ''}`} ref={this.videoRef} style={{ display: 'block' }}>
          <source src={`/zones/${zoneVideoSrc}.mp4`} type="video/mp4"></source>
        </video>
        <video className={`w-100 ${classes.video ?? ''}`} ref={this.reverseVideoRef} style={{ display: 'none' }}>
          <source src={`/zones/${zoneVideoSrc}-inverso.mp4`} type="video/mp4"></source>
        </video>
      </>
    )
  }
}
