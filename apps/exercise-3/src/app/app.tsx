import { css } from '@emotion/react';

export function App() {
  const styles = css`
    background: coral;
    font-family: 'Inter', sans-serif;
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: absolute;
      top: 0;
      left: 0;
    }

    .content {
      position: relative;
      background: white;
      padding: 24px;

      strong {
        font-weight: 700;
      }
    }
  `;
  return (
    <div css={styles}>
      <img
        src="https://media.giphy.com/media/26u4cqiYI30juCOGY/giphy.gif"
        alt=""
      />
      <div className="content">
        <strong>Congratulations!</strong> You just deployed an entire freaking
        website.
      </div>
    </div>
  );
}

export default App;
