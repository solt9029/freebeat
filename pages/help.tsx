import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
} from '@material-ui/core'

// BPMとは何ですか？
// 曲のBPMはどうやったら分かりますか？
// 編集キーとは何ですか？
// YouTubeの動画を追加できないのですが？
// その他質問

const HelpPage = () => {
  return (
    <Box my={7}>
      <Container fixed>
        <h1>よくある質問</h1>
        <Box mb={3}>
          <Card>
            <CardHeader title="Q. BPMとは何ですか？"></CardHeader>
            <CardContent>
              Beats Per
              Minuteの略で、1分間の拍数を表します。基本的には、BPMの値が大きければ大きいほど、その曲はテンポがはやい曲です。
            </CardContent>
          </Card>
        </Box>

        <Box mb={3}>
          <Card>
            <CardHeader title="Q. 曲のBPMはどうやったら分かりますか？"></CardHeader>
            <CardContent>
              自分で曲を聴きながら拍に合わせてボタンを押すことでBPMを計測することができるようなサービスがあります。
              管理人は以下のサービスをよく使っています。
              <ul>
                <li>
                  BPMカウンター{' '}
                  <a href="https://bpm.mononichi.com/" target="_blank">
                    https://bpm.mononichi.com/
                  </a>
                </li>
              </ul>
              <br />
              また、曲のBPMは検索すれば見つかることもよくあります。管理人が検索する際には、以下のサイトがよくヒットします。
              <ul>
                <li>
                  世界は一日にして成らず ～BPM（テンポ ）計測 まとめ～{' '}
                  <a href="http://ongakumichi523.jp/" target="_blank">
                    http://ongakumichi523.jp/
                  </a>
                </li>
                <li>
                  歌詞タイピング＆楽曲分析 KeyTube{' '}
                  <a href="https://keytube.net/song/" target="_blank">
                    https://keytube.net/song/
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>
        </Box>

        <Box mb={3}>
          <Card>
            <CardHeader title="Q. 編集キーとは何ですか？"></CardHeader>
            <CardContent>
              編集キーとは、そのプレイリストを編集および保存するために必要なキーです。プレイリストを作成した端末ではその編集キーはブラウザに自動で記録されるようになっています。もし、別のブラウザや端末から自分で作成したプレイリストを編集したくなった場合には、その編集キーを入力する必要があります。また、同じ端末・ブラウザだとしても、履歴などのデータを削除した場合には記録が破棄されるので、必ずメモしておくようにしてください。
            </CardContent>
          </Card>
        </Box>

        <Box mb={3}>
          <Card>
            <CardHeader title="Q. YouTubeの動画が追加できないのですが？"></CardHeader>
            <CardContent>
              YouTube動画を追加する際、基本的には以下のようなURLの形式であることを確認してください。どうしても追加できない場合には
              <a href="https://twitter.com/solt9029">@solt9029</a>
              までお問い合わせください。
              <ul>
                <li>
                  YouTube動画のURL https://www.youtube.com/watch?v=cQ6f67jJUEA
                </li>
                <li>
                  YouTubeプレイリストのURL
                  https://www.youtube.com/playlist?list=PL_TTuJrKrM_jaE6TBHcjVA5wc7lZGRsL1
                </li>
              </ul>
            </CardContent>
          </Card>
        </Box>

        <Box mb={3}>
          <Card>
            <CardHeader title="Q. その他"></CardHeader>
            <CardContent>
              その他、本サービスの使い方について質問のある場合には
              <a href="https://twitter.com/solt9029">@solt9029</a>
              にお問い合わせください。
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  )
}

export default HelpPage
