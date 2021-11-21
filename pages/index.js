import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Container,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormHelperText,
  Button
} from '@mui/material';
import Head from 'next/head'

import { db, collection, addDoc } from '../config/firebaseApp'

export default function Home() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  // 現在、プログラミングを学習していますか？の値
  const [isLearningValue, setIsLearningValue] = useState('')

  // これまでに、プログラミングを学習したことありますか？の値
  const [wasLearningValue, setWasLearningValue] = useState('')

  // 現在、プログラミングを学習していますか？の値の設定
  const onChange_isLearning = (e) => {
    setIsLearningValue(e.target.value)
  }

  // これまでに、プログラミングを学習したことありますか？の値の設定
  const onChange_wasLearning = (e) => {
    setWasLearningValue(e.target.value)
  }

  // 今まで学習したことのあるプログラミング言語の質問表示の判定
  const showLearnedLunguage = () => (isLearningValue === 'yes' || wasLearningValue === 'yes')


  const onSubmit = (data) => {
    // デフォルトの挙動は自動的にキャンセルしてくれる
    const { learnedLunguage, ...restData } = data

    // firebaseに登録
    const docRef = addDoc(collection(db, 'answers'), {
      ...restData,
      // 今まで学習したことのあるプログラミング言語 を入力欄が非表示の場合は、空文字にする
      learnedLunguage: showLearnedLunguage() ? learnedLunguage : ''
    })

    // テスト(レビュー用に登録されたか、コンソール出力)
    console.log('answers', docRef)
  }

  return (
    <>
      <Head>
        <title>プログラミング学習に関するアンケート</title>
      </Head>
      <main>
        <Container>
          <h1>
            プログラミング学習に関するアンケート
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <TextField
                id="name"
                label="Q1.名前を入力してください(匿名可）。"
                variant="outlined"
                size="small"
                fullWidth
                margin="normal"
                {...register('name')}
              />
            </div>
            <div>
              <TextField
                id="birth"
                label="Q2.生年月日を入力してください(例: 19900101)。"
                variant="outlined"
                size="small"
                fullWidth
                margin="normal"
                {...register('birth',
                  {
                    required: 'このフィールドは回答必須です。',
                    pattern: { value: /^(19|20).{2}(0[1-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/, message: '有効な整数8桁で入力してください' }
                  }
                )}
                error={'birth' in errors}
                helperText={errors.birth?.message}
              />
            </div>
            <div>
              <FormControl component="fieldset" error={'isLearning' in errors}>
                <FormLabel component="legend">Q3.現在、プログラミングを学習していますか？</FormLabel>
                <RadioGroup row aria-label="isLearning" name="isLearning-group" onChange={onChange_isLearning}>
                  <FormControlLabel value="yes" control={<Radio />} label="はい" {...register('isLearning', { required: true })} />
                  <FormControlLabel value="no" control={<Radio />} label="いいえ" {...register('isLearning', { required: true })} />
                  <FormControlLabel value="other" control={<Radio />} label="わからない" {...register('isLearning', { required: true })} />
                </RadioGroup>
                <FormHelperText>{errors.isLearning && 'このフィールドは回答必須です。'}</FormHelperText>
              </FormControl>
            </div>
            <div>
              <FormControl component="fieldset" error={'wasLearning' in errors}>
                <FormLabel component="legend">Q4.これまでに、プログラミングを学習したことありますか？</FormLabel>
                <RadioGroup row aria-label="wasLearning" name="wasLearning-group" onChange={onChange_wasLearning}>
                  <FormControlLabel value="yes" control={<Radio />} label="はい" {...register('wasLearning', { required: true })} />
                  <FormControlLabel value="no" control={<Radio />} label="いいえ" {...register('wasLearning', { required: true })} />
                  <FormControlLabel value="other" control={<Radio />} label="わからない" {...register('wasLearning', { required: true })} />
                </RadioGroup>
                <FormHelperText>{errors.wasLearning && 'このフィールドは回答必須です。'}</FormHelperText>
              </FormControl>
            </div>
            {showLearnedLunguage() && (
              <div>
                <TextField
                  id="learnedLunguage"
                  label="Q5.今まで学習したことのあるプログラミング言語をすべて教えてください。"
                  variant="outlined"
                  size="small"
                  fullWidth
                  margin="normal"
                  {...register('learnedLunguage')}
                />
              </div>
            )}

            <Button type="submit" variant="contained">アンケートを提出する</Button>
          </form>
        </Container>
      </main>
    </>
  )
}
