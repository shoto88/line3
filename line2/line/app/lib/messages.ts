import { formatDate } from './dateUtils';

export function getTicketMessage(waitingNumber: number) {
  const yourNumber = waitingNumber + 1;
  return {
    type: 'flex',
    altText: '発券メッセージ',
    contents: {
      type: 'bubble',
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: '現在の待ち状況',
            weight: 'bold',
            size: 'xl',
            margin: 'md',
          },
          {
            type: 'text',
            text: `現在、${waitingNumber}番目まで発券済みです。`,
            wrap: true,
            margin: 'md',
          },
          {
            type: 'separator',
            margin: 'xxl',
          },
          {
            type: 'text',
            text: `あなたの順番は、${yourNumber}番目です。`,
            wrap: true,
            margin: 'md',
          },
          {
            type: 'text',
            text: '予約券を発券しますか？',
            wrap: true,
            margin: 'md',
          },
        ],
      },
      footer: {
        type: 'box',
        layout: 'vertical',
        spacing: 'sm',
        contents: [
          {
            type: 'button',
            style: 'link',
            height: 'sm',
            action: {
              type: 'message',
              label: '発券する',
              text: '発券',
            },
          },
          {
            type: 'button',
            style: 'link',
            height: 'sm',
            action: {
              type: 'message',
              label: '発券しない',
              text: 'キャンセル',
            },
          },
          {
            type: 'spacer',
            size: 'sm',
          },
        ],
        flex: 0,
      },
    },
  };
}

export function getStatusMessage(waitingNumber: number, currentNumber: number) {
  return {
    type: 'flex',
    altText: '現在の待ち状況',
    contents: {
      type: 'bubble',
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: '現在の待ち状況',
            weight: 'bold',
            size: 'xl',
            margin: 'md',
          },
          {
            type: 'box',
            layout: 'vertical',
            margin: 'xxl',
            spacing: 'sm',
            contents: [
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'text',
                    text: '発券済番号',
                    size: 'sm',
                    color: '#555555',
                    flex: 0,
                  },
                  {
                    type: 'text',
                    text: String(waitingNumber),
                    size: 'sm',
                    color: '#111111',
                    align: 'end',
                  },
                ],
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'text',
                    text: '診察中番号',
                    size: 'sm',
                    color: '#555555',
                    flex: 0,
                  },
                  {
                    type: 'text',
                    text: String(currentNumber),
                    size: 'sm',
                    color: '#111111',
                    align: 'end',
                  },
                ],
              },
              {
                type: 'separator',
                margin: 'xxl',
              },
              {
                type: 'box',
                layout: 'vertical',
                margin: 'md',
                contents: [
                  {
                    type: 'text',
                    text: '・順番に間にあう場合のみ発券して下さい',
                    size: 'xs',
                    color: '#aaaaaa',
                    wrap: true,
                  },
                  {
                    type: 'text',
                    text: '・遅れた場合予約券は無効になります',
                    size: 'xs',
                    color: '#aaaaaa',
                    wrap: true,
                  },
                  {
                    type: 'text',
                    text: '・余裕をもってご来院ください',
                    size: 'xs',
                    color: '#aaaaaa',
                    wrap: true,
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  };
}

export function getHoursMessage() {
  return {
    type: 'flex',
    altText: '利用時間',
    contents: {
      type: 'bubble',
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: '現在システム利用時間外です🙇‍♂️',
            weight: 'bold',
            size: 'sm',
            color: '#ff0000',
            margin: 'sm',
          },
          {
            type: 'text',
            text: 'LINE予約システム利用時間',
            weight: 'bold',
            size: 'xl',
            margin: 'md',
          },
          {
            type: 'box',
            layout: 'vertical',
            margin: 'xxl',
            spacing: 'sm',
            contents: [
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'text',
                    text: '午前(月~金)',
                    size: 'sm',
                    color: '#555555',
                    flex: 0,
                  },
                  {
                    type: 'text',
                    text: '10:20~11:40',
                    size: 'sm',
                    color: '#111111',
                    align: 'end',
                  },
                ],
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'text',
                    text: '午後(月~金)',
                    size: 'sm',
                    color: '#555555',
                    flex: 0,
                  },
                  {
                    type: 'text',
                    text: '14:20~18:30',
                    size: 'sm',
                    color: '#111111',
                    align: 'end',
                  },
                ],
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'text',
                    text: '土曜',
                    size: 'sm',
                    color: '#555555',
                    flex: 0,
                  },
                  {
                    type: 'text',
                    text: '10:20~14:20',
                    size: 'sm',
                    color: '#111111',
                    align: 'end',
                  },
                ],
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'text',
                    text: '休診',
                    size: 'sm',
                    color: '#555555',
                    flex: 0,
                  },
                  {
                    type: 'text',
                    text: '日曜・祝日',
                    size: 'sm',
                    color: '#111111',
                    align: 'end',
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  };
}

export function getHolidayMessage() {
  return {
    type: 'flex',
    altText: '休診日のお知らせ',
    contents: {
      type: 'bubble',
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: '休診日のお知らせ',
            weight: 'bold',
            size: 'xl',
            margin: 'md',
          },
          {
            type: 'text',
            text: '本日は休診日です。\n予約券の発券はできません。',
            wrap: true,
            margin: 'md',
          },
          {
            type: 'separator',
            margin: 'xxl',
          },
          {
            type: 'box',
            layout: 'vertical',
            margin: 'md',
            contents: [
              {
                type: 'text',
                text: 'システム利用時間',
                size: 'md',
                weight: 'bold',
                margin: 'md',
              },
              {
                type: 'box',
                layout: 'vertical',
                margin: 'lg',
                spacing: 'sm',
                contents: [
                  {
                    type: 'box',
                    layout: 'baseline',
                    spacing: 'sm',
                    contents: [
                      {
                        type: 'text',
                        text: '月曜~金曜',
                        color: '#aaaaaa',
                        size: 'sm',
                        flex: 1,
                      },
                      {
                        type: 'text',
                        text: '10:20 - 11:40 / 14:20 - 18:10',
                        wrap: true,
                        color: '#666666',
                        size: 'sm',
                        flex: 4,
                      },
                    ],
                  },
                  {
                    type: 'box',
                    layout: 'baseline',
                    spacing: 'sm',
                    contents: [
                      {
                        type: 'text',
                        text: '土曜',
                        color: '#aaaaaa',
                        size: 'sm',
                        flex: 1,
                      },
                      {
                        type: 'text',
                        text: '10:20 - 14:20',
                        wrap: true,
                        color: '#666666',
                        size: 'sm',
                        flex: 4,
                      },
                    ],
                  },
                  {
                    type: 'box',
                    layout: 'baseline',
                    spacing: 'sm',
                    contents: [
                      {
                        type: 'text',
                        text: '日曜・祝日',
                        color: '#aaaaaa',
                        size: 'sm',
                        flex: 1,
                      },
                      {
                        type: 'text',
                        text: '休診',
                        wrap: true,
                        color: '#666666',
                        size: 'sm',
                        flex: 4,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  };
}

export function getTicketConfirmationMessage(ticketNumber: number) {
  return {
    type: 'flex',
    altText: '発券完了',
    contents: {
      type: 'bubble',
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: '大濠パーククリニック　診察予約券',
            weight: 'bold',
            size: 'lg',
            margin: 'md',
            align: 'center',
          },
          {
            type: 'text',
            text: String(ticketNumber),
            weight: 'bold',
            size: '5xl',
            margin: 'md',
            align: 'center',
          },
          {
            type: 'separator',
            margin: 'xxl',
          },
          {
            type: 'box',
            layout: 'vertical',
            margin: 'md',
            spacing: 'sm',
            contents: [
              {
                type: 'text',
                text: '・こちらの画面を受付でご提示下さい',
                size: 'xs',
                color: '#aaaaaa',
                wrap: true,
              },
              {
                type: 'text',
                text: '・来院前にメルプの記入を必ずお願いします',
                size: 'xs',
                color: '#ff0000',
                wrap: true,
              },
              {
                type: 'text',
                text: '・記入済みの方は記入しなくて大丈夫です',
                size: 'xs',
                color: '#FAA0A0',
                wrap: true,
              },
              {
                type: 'text',
                text: '・受付時間に間に合うように来院お願いします',
                size: 'xs',
                color: '#aaaaaa',
                wrap: true,
              },
            ],
          },
        ],
      },
    },
  };
}

export function getWaitingTimeMessage(ticketNumber: number, waitingNumber: number, currentNumber: number, averageWaitingTime: number) {
  const estimatedWaitingTime = (ticketNumber - currentNumber) * averageWaitingTime;
  const now = new Date();
  const estimatedTime = new Date(now.getTime() + estimatedWaitingTime * 60000);
  const estimatedTimeString = formatDate(estimatedTime, 'HH:mm');
  const estimatedMinutesString = `(${Math.round(estimatedWaitingTime)}分後)`;

  return {
    type: 'flex',
    altText: '待ち時間',
    contents: {
      type: 'bubble',
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: '待ち時間',
            weight: 'bold',
            size: 'xl',
            margin: 'md',
          },
          {
            type: 'box',
            layout: 'vertical',
            margin: 'xxl',
            spacing: 'sm',
            contents: [
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'text',
                    text: '発券済番号',
                    size: 'sm',
                    color: '#555555',
                    flex: 0,
                  },
                  {
                    type: 'text',
                    text: String(waitingNumber),
                    size: 'sm',
                    color: '#111111',
                    align: 'end',
                  },
                ],
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'text',
                    text: '診察中番号',
                    size: 'sm',
                    color: '#555555',
                    flex: 0,
                  },
                  {
                    type: 'text',
                    text: String(currentNumber),
                    size: 'sm',
                    color: '#111111',
                    align: 'end',
                  },
                ],
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'text',
                    text: 'あなたの番号',
                    size: 'sm',
                    color: '#555555',
                    flex: 0,
                  },
                  {
                    type: 'text',
                    text: String(ticketNumber),
                    size: 'sm',
                    color: '#111111',
                    align: 'end',
                  },
                ],
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  {
                    type: 'text',
                    text: '予想診療時刻',
                    size: 'sm',
                    color: '#555555',
                    flex: 0,
                  },
                  {
                    type: 'text',
                    text: `${estimatedTimeString} ${estimatedMinutesString}`,
                    size: 'sm',
                    color: '#111111',
                    align: 'end',
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  };
}