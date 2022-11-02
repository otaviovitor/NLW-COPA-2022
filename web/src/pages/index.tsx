

interface HomeProps {
  poolCount: number;
  guessCount: number;
  userCount: number;
}

import Image from 'next/image'
import appPreviewImg from '../assets/app-nlw-copa-preview.png'
import logoImg from '../assets/logo.svg'
import usersAvatarExapleImg from '../assets/users-savatar-example.png'

import iconChackImage from '../assets/icon-check.svg'
import { api } from '../lib/axios';
import { FormEvent, useState } from 'react';

export default function Home(props: HomeProps) {

  const [poolTitle, setPoolTitle] = useState('')


  async function createPool(event: FormEvent) {
    event.preventDefault()

    try {
      const response = await api.post('/pools', {
        title : poolTitle,
      });

      const {code} = response.data

      await navigator.clipboard.writeText(code)

      alert('Bolão foi criado com sucesso, o código foi copiado para a ária de transferência!')

      setPoolTitle('')
    } catch(err) {
        console.log(err);
        alert('Falha ao criar o boão, tente novamente!')
    }
  }




  return (
    <div className='max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center  '>
      <main>
        <Image src={logoImg} alt="NLW Copa" />

        <h1 className='mt-14 text-white text-5xl font-bold leading-tight'>Crie seu próprio bolão da copa e compartilhe entre amigos!</h1>

        <div className='mt-10 flex items-center gap-2 '>
          <Image src={usersAvatarExapleImg} alt="" />
          <strong className='text-gray-100 text-xl'>
            <span className='text-ignite-500'>+{props.userCount}</span> pessoas já estão usando
          </strong>
        </div>

        <form onSubmit={createPool} className='mt-10 flex gap-2' >
          <input 
          className='flex-1 py-4 px-6 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100'
          type="text" 
          required
          placeholder=' Qual nome do seu bolão?'
          onChange={event => setPoolTitle(event.target.value)}
          value={poolTitle}/>

          <button
          className='bg-yellow-500 py-4 px-6 rounded font-bold text-gray-900 text-sm uppercase hover:bg-yellow-700'
          type='submit'
          >
          Criar meu bolão
          </button>
        </form>


        <p className='text-gray-300 mt-4 leading-relaxed  '>
          Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀
          </p>

        <div className='mt-10 pt-10 border-t border-gray-600 text-gray-100 flex items-center justify-between '>
          <div className='flex items-center gap-6 '>
            <Image src={iconChackImage} alt='' />
            <div className='flex flex-col '>
              <span className='font-bold text-2xl'>+{props.poolCount}</span>
              <span>Bolões criados</span>
            </div>
          </div>
          <div className='w-px h-14 bg-gray-600' />
          <div className='flex items-center gap-6 '>
            <Image src={iconChackImage} alt='' />
            <div className='flex flex-col '>
              <span className='font-bold text-2xl'>+{props.guessCount}</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>

      </main>
      
      <Image src={appPreviewImg} alt="Dois celulares exibindo uma prévia da aplicação móvel do NLW Copa" quality={100} />
    </div>
  )
}

export const getServerSideProps = async () => {

  const [poolCountResponse, guessCountResponse, userCountResponse] = await Promise.all([
    api.get('pools/count'),
    api.get('guesses/count'),
    api.get('users/count'),
  ])

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count,
    },
  };
};