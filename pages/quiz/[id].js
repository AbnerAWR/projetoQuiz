import { ThemeProvide } from 'styled-components'
import QuizScreen from '../../src/screens/Quiz'

export default function QuizDaGalera({ dbExterno }) {
    return (
        <ThemeProvide theme={dbExterno.theme}>
            <QuizScreen 
                externalQuestions={dbExterno.question}
                externalBg={dbExterno.bg}
            />
        </ThemeProvide>
    )
}

export async function getServicesSideProps(context) {
    const [projectName, githubUser] = context.query.id.split('__')

    try {
        const dbExterno = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`)
            .then((respondeServer) => {
                if(respostaDoServer.ok){
                    return respondeServer.json()
                }
                throw new Error ('Falha em pegar os dados')
            })
            .then((responstaConvertidaEmObjeto) => responstaConvertidaEmObjeto)

        return {
            props:
                dbExterno,
        }

    } catch(err) {
        throw new Error(err);
    }
}