/* global React, ReactDOM */

const enzoTei = "v8rH0S3UZLE";
const html = htm.bind(React.createElement);

function App() {
  const [uid, setUid] = React.useState(enzoTei);
  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await fetch("/certificate/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: uid,
      }),
    });
    alert(await result.text());
  };
  return html`
    <form onSubmit=${onSubmit}>
      <input
        type="text"
        placeholder="TEI UID"
        value=${uid}
        onChange=${(e) => setUid(e.target.value)}
      />
      <button type="submit">Generate certificate</button>
    </form>
  `;
}

ReactDOM.render(html`<${App} />`, document.getElementById("root"));
