/**
 * @domain forumdinheiro.com
 * @domain guis2.com
 * @domain tarviral.com
 * @domain umconto.com
 */
_.register({
  rule: {
    host: /^(www\.)?(forumdinheiro|guis2|tarviral|umconto)\.com$/,
  },
  async start() {
    const api = `${window.location.origin}/api`;
    const session = JSON.parse(await $.get(`${api}/session-info`));
    if (!session.hasSession) {
      return;
    }

    // each call unlocks one stage; the server does not check the countdown
    for (
      let progress = session.stageNumber + 1;
      progress <= session.totalStage + 1;
      progress++
    ) {
      const text = await $.get(
        `${api}/trpc/linkSession.nextStage`,
        {
          batch: 1,
          input: JSON.stringify({
            0: {
              json: {
                token: session.sessionToken,
                progress,
                stageId: session.stageId,
              },
            },
          }),
        },
        { "trpc-accept": "application/jsonl" },
      );
      const m = text.match(/"destinationLink":("(?:[^"\\]|\\.)*")/);
      if (m) {
        await $.openLink(JSON.parse(m[1]));
        return;
      }
    }
    _.warn("destination link not found");
  },
});
