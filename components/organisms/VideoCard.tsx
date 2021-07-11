import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  debounce,
  Grid,
  makeStyles,
  TextField,
} from '@material-ui/core'
import { DeleteOutlined } from '@material-ui/icons'
import React, { useCallback, useContext } from 'react'
import { useUpdateVideoMutation } from '../../graphql/generated/graphql-client'
import { AppContext } from '../../contexts'

const useStyles = makeStyles(() => ({
  title: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    fontSize: '1rem',
  },
  field: {
    width: '100%',
  },
  img: {
    borderRadius: '1.5%',
    width: '100%',
  },
  card: {
    width: '100%',
  },
  button: {
    justifyContent: 'flex-start',
  },
}))

type Props = {
  id: number
  bpm?: number
  youtubeVideoId: string
  youtubeVideoTitle?: string
}

function VideoCard(props: Props) {
  const classes = useStyles()
  const { state, dispatch } = useContext(AppContext)

  const [updateVideo] = useUpdateVideoMutation({
    onCompleted: (data) => {
      console.log(data)
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const updateBpm = useCallback(
    debounce((value: number) => {
      updateVideo({
        variables: {
          id: props.id,
          key: state.key,
          bpm: value,
        },
      })
    }, 1000),
    [updateVideo, state.key, props.id],
  )

  const handleChange = useCallback(
    (event) => {
      dispatch({
        type: 'UPDATE_VIDEO_BPM',
        payload: { id: props.id, bpm: parseInt(event.target.value) },
      })
      updateBpm(parseInt(event.target.value))
    },
    [dispatch, props.id, updateBpm],
  )

  return (
    <Card variant="outlined" className={classes.card}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item sm={3} xs={12} zeroMinWidth>
            <img
              src={`https://i.ytimg.com/vi/${props.youtubeVideoId}/mqdefault.jpg`}
              className={classes.img}
            />
          </Grid>
          <Grid item sm={9} xs={12} zeroMinWidth>
            <Box mb={1}>
              <div className={classes.title}>{props.youtubeVideoTitle}</div>
            </Box>

            <TextField
              type="number"
              className={classes.field}
              label="BPM"
              value={props.bpm || ''}
              onChange={handleChange}
            />
            <small style={{ color: 'rgba(0, 0, 0, 0.54)' }}>
              この音楽のBPMを入力してください。
            </small>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button size="small" fullWidth className={classes.button}>
          <DeleteOutlined />
          プレイリストから削除
        </Button>
      </CardActions>
    </Card>
  )
}

export default VideoCard
