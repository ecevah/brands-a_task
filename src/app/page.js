export default function Home() {
  return (
    <div className="login-container">
      <div className="top"></div>
      <div className="bottom"></div>
      <div className="center">
        <h2>Giriş Yap</h2>
        <input type="email" placeholder="email" />
        <input type="password" placeholder="password" />
        <div className="flex flex-row mt-[5px]">
          <button className="bg-green-400 mr-[10px] px-[15px] py-[5px] rounded-md text-white font-bold">
            Giriş Yap
          </button>
          <button> Kayıt Ol</button>
        </div>
      </div>
    </div>
  );
}
