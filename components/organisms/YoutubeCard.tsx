import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core'
import { Delete, DeleteOutline, DeleteOutlined } from '@material-ui/icons'
import React from 'react'

type Props = {
  youtubeVideoId: string
}

function YoutubeCard(props: Props) {
  return (
    <Card variant="outlined" style={{ width: '100%' }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item sm={3} xs={12}>
            <img
              src={`https://i.ytimg.com/vi/${props.youtubeVideoId}/mqdefault.jpg`}
              width="100%"
              // height="100%"
              style={{ borderRadius: '1.5%' }}
            />
          </Grid>
          <Grid item sm={9} xs={12}>
            <Box m={1}>
              <Typography variant="h6">魔法</Typography>
              <TextField style={{ width: '100%' }} label="BPM" />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button size="small">
          <DeleteOutlined />
          プレイリストから削除
        </Button>
      </CardActions>
    </Card>
  )
}

export default YoutubeCard
