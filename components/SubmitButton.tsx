import LoadingDots from "./LoadingDots"


type Props = {
    btnText?: string,
    loadingText?: string
    laodingState?: boolean
}

const Submit = ({ btnText="Submit", loadingText, laodingState=false }: Props) => {

    return (
        <>
            {
                laodingState ? 
                    <>
                        {
                            loadingText && loadingText
                        }
                        <LoadingDots />
                    </>
                :
                    <>{btnText}</>
            }
        </>
    )
}

export default Submit