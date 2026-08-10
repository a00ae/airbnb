import Card from "./apartments/Card"




const Main = () => {
  return (
    <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-md)"
    }} className="main">
        <Card />

    </div>
  )
}

export default Main