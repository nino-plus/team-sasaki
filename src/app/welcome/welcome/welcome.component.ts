import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  isLoadingImg = true;
  usageSteps = [
    `discordチャンネルでルームを作成\nチャンネルの編集、連携サービスから\nウェブフックを作成しよう！\n(権限がない時はできないため、\nチャンネル管理者に相談しましょう。)`,
    `ログイン後ウェブフックを入力すれば準備完了！`,
    `＋ボタンでタイマーをセットして\nやるべきことに取り組もう💪`,
    `時間内に達成しないと、\ndiscordチャンネルに罰ゲームと共に\n失敗が晒されてしまう...😭\n逆に達成すると、レベルアップ！\nみんなで競い合おう！`,
  ];

  constructor(
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
  }
}
