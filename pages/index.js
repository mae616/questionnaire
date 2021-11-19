import { useForm } from 'react-hook-form'

import Head from 'next/head'

export default function Home() {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    // デフォルトの挙動は自動的にキャンセルしてくれる
    console.log(data)
  }

  return (
    <>
      <Head>
        <title>プログラミング学習に関するアンケート</title>
      </Head>

      <main>
        <h1>
          プログラミング学習に関するアンケート
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name">Q1.名前を入力してください(匿名可）。</label><br />
            <input id="name" {...register('name')} />
          </div>
          <div>
            <label htmlFor="birth">Q2.生年月日を入力してください(例: 19900101)。</label><br />
            <input
              id="birth"
              {...register('birth',
                {
                  required: 'このフィールドは回答必須です。',
                  pattern: { value: /^(19|20).{2}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/, message: '有効な整数8桁で入力してください' }


                }
              )}
            /><br />
            {errors.birth && <span>{errors.birth.message}</span>}
          </div>
          <div>
            Q3.現在、プログラミングを学習していますか？<br />
            <input
              id="isLearning_yes"
              {...register('isLearning', { required: true })}
              type="radio"
              value="yes"
            />
            <label htmlFor="isLearning_yes">はい</label>

            <input
              id="isLearning_no"
              {...register('isLearning', { required: true })}
              type="radio"
              value="no"
            />
            <label htmlFor="isLearning_no">いいえ</label>

            <input
              id="isLearning_etc"
              {...register('isLearning', { required: true })}
              type="radio"
              value="etc"
            />
            <label htmlFor="isLearning_etc">わからない</label><br />
            {errors.isLearning && <span>このフィールドは回答必須です。</span>}
          </div>
          <div>
            Q4.これまでに、プログラミングを学習したことありますか？<br />
            <input
              id="wasLearning_yes"
              {...register('wasLearning', { required: true })}
              type="radio"
              value="yes"
            />
            <label htmlFor="wasLearning_yes">はい</label>

            <input
              id="wasLearning_no"
              {...register('wasLearning', { required: true })}
              type="radio"
              value="no"
            />
            <label htmlFor="wasLearning_no">いいえ</label>

            <input
              id="wasLearning_etc"
              {...register('wasLearning', { required: true })}
              type="radio"
              value="etc"
            />
            <label htmlFor="wasLearning_etc">わからない</label><br />
            {errors.wasLearning && <span>このフィールドは回答必須です。</span>}
          </div>
          <button type="submit">アンケートを提出する</button>
        </form>
      </main>
    </>
  )
}
