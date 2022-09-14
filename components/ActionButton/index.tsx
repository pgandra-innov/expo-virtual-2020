interface Props {
  padding: string,
  icon: 'call' | 'mail' | 'news' | 'share',
  onClick?: () => void
}

export const ActionButton = (props: Props): JSX.Element =>
  <div className={`row ${props.padding}`}>
    <button
      type="button"
      className='btn btn-light d-flex justify-content-center align-items-center text-success rounded-circle p-0 border-0'
      onClick={props.onClick}
    >
      <img src={`/content/icons/${props.icon}.svg`} width='40' height='40' />
    </button>
  </div>
