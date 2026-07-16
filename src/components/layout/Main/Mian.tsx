import Card from "./section-1/Card"




const Mian = () => {
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

export default Mian