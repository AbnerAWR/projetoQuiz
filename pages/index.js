import styled from 'styled-components';
import { useRouter } from 'next/router'

import db from '../db.json'

import Widget from '../src/components/Widget'
import QuizLogo from '../src/components/QuizLogo'
import Footer from '../src/components/Footer'
import GitHubCorner from '../src/components/GitHubCorner'
import QuizBackground from '../src/components/QuizBackground'
import Head from 'next/head'
import Button from '../src/components/Button'
import Input from '../src/components/Input'
import Link from '../src/components/Link'

const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`

export default function Home() {
  const router = useRouter()
  const [name, setName] = React.useState('')

  return (
    <QuizBackground backgroundImage={db.bg}>
       <Head>
          <title> Projeto Quiz </title>
        </Head>
      <QuizContainer>
        <QuizLogo />
       
        <Widget>
            <Widget.Header>
              <h1>League of Legends Quiz</h1>
            </Widget.Header>

          <Widget.Content>
            <form onSubmit={ (e) => { e.preventDefault()
                router.push(`/quiz?name=${name}`)
                console.log('Fazendo uma submissão por meio do react')
            }}>

              <Input 
                name="nomeDoUsuario" 
                onChange={(e) => setName(e.target.value)}
                placeholder="Qual o seu nome?"
                value={name} 
              />

              <Button type="submit" disabled={name.length === 0}>
                Jogar
              </Button>

            </form>

          </Widget.Content> 
        </Widget>

        <Widget>
          
        <Widget.Content>
            <h1>Quizes da Galera</h1>

            <ul>
              {db.external.map((linkExterno) => {
                const [projectName, githubUser] = linkExterno
                  .replace(/\//g, '')
                  .replace('https:', '')
                  .replace('.vercel.app', '')
                  .split('.');

                return (
                  <li key={linkExterno}>
                    <Widget.Topic
                      as={Link}
                      href={`/quiz/${projectName}___${githubUser}`}
                    >
                      {`${githubUser}/${projectName}`}
                    </Widget.Topic>
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer />

      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/AbnerAWR/projetoQuiz"/>
    </QuizBackground>

  )
}
