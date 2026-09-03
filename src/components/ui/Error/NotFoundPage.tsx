

type Props = {
    errorMessage: string;
    fatchData: () => void;
}

const NotFoundPage = ({errorMessage, fatchData}: Props) => {
  return (
    <div>
        <p>{errorMessage}</p>

        <button onClick={fatchData}>reload</button>

    </div>
  )
}

export default NotFoundPage