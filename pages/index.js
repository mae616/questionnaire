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

import firebaseApp from '../config/firebaseApp'
import { getFirestore, collection, addDoc } from 'firebase/firestore'

export default function Home() {
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();

  // 今まで学習したことのあるプログラミング言語の質問表示の判定
  const showLearnedLunguage = () => (watch('isLearning') === 'yes' || watch('wasLearning') === 'yes')

  console.log(watch())

  const onSubmit = async (data) => {
    // デフォルトの挙動は自動的にキャンセルしてくれる

    // firebaseに登録
    let docRef
    try {
      const { learnedLunguage, ...restData } = data

      const db = getFirestore(firebaseApp);

      docRef = await addDoc(collection(db, 'answers'), {
        ...restData,
        // 今まで学習したことのあるプログラミング言語 を入力欄が非表示の場合は、空文字にする
        learnedLunguage: showLearnedLunguage() ? learnedLunguage : ''
      })

    } catch (err) {
      alert(`error: ${err}`)
      return
    }

    if (docRef.id) {
      if (!alert('アンケートを提出しました')) {
        reset()
      }
    }
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
            {/* <div>
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
            </div> */}


            <div>
              <FormControl component="fieldset" error={'isLearning' in errors}>
                <FormLabel component="legend">Q3.現在、プログラミングを学習していますか？</FormLabel>
                <RadioGroup row aria-label="isLearning" name="isLearning-group">
                  <FormControlLabel value="yes" control={<Radio {...register('isLearning', { required: true })} />} label="はい" />
                  <FormControlLabel value="no" control={<Radio {...register('isLearning', { required: true })} />} label="いいえ" />
                  <FormControlLabel value="other" control={<Radio {...register('isLearning', { required: true })} />} label="わからない" />
                </RadioGroup>
                <FormHelperText>{errors.isLearning && 'このフィールドは回答必須です。'}</FormHelperText>
              </FormControl>
            </div>
            <div>
              <FormControl component="fieldset" error={'wasLearning' in errors}>
                <FormLabel component="legend">Q4.これまでに、プログラミングを学習したことありますか？</FormLabel>
                <RadioGroup row aria-label="wasLearning" name="wasLearning-group">
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
