import { useForm } from 'react-hook-form'
import {
  Container,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormHelperText
} from '@mui/material';
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
        <Container>
          <h1>
            プログラミング学習に関するアンケート
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="name"></label><br />
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
              <label htmlFor="birth"></label><br />
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
                <RadioGroup row aria-label="isLearning" name="isLearning-group">
                  <FormControlLabel value="yes" control={<Radio />} label="はい"  {...register('isLearning', { required: true })} />
                  <FormControlLabel value="no" control={<Radio />} label="いいえ"  {...register('isLearning', { required: true })} />
                  <FormControlLabel value="other" control={<Radio />} label="わからない"  {...register('isLearning', { required: true })} />
                </RadioGroup>
                <FormHelperText>{errors.isLearning && 'このフィールドは回答必須です。'}</FormHelperText>
              </FormControl>
            </div>
            <div>
              <FormControl component="fieldset" error={'isLearning' in errors}>
                <FormLabel component="legend">Q4.これまでに、プログラミングを学習したことありますか？</FormLabel>
                <RadioGroup row aria-label="wasLearning" name="wasLearning-group">
                  <FormControlLabel value="yes" control={<Radio />} label="はい"  {...register('wasLearning', { required: true })} />
                  <FormControlLabel value="no" control={<Radio />} label="いいえ"  {...register('wasLearning', { required: true })} />
                  <FormControlLabel value="other" control={<Radio />} label="わからない"  {...register('wasLearning', { required: true })} />
                </RadioGroup>
                <FormHelperText>{errors.wasLearning && 'このフィールドは回答必須です。'}</FormHelperText>
              </FormControl>
            </div>
            <button type="submit">アンケートを提出する</button>
          </form>
        </Container>
      </main>
    </>
  )
}
