// Componente = função que recebe "props" (dados de fora) e devolve JSX (a tela).
// Aqui recebemos UM objeto "pet" e desenhamos o cartão dele.
function PetCard({ pet }) {
  // Se o status for "Disponível", usamos a classe CSS "disponivel"; senão "adotado".
  const classeStatus = pet.status === "Disponível" ? "disponivel" : "adotado";

  return (
    <article className={`card ${classeStatus}`}>
      <span className={`selo ${classeStatus}`}>{pet.status}</span>
      <div className="card-imagem">{pet.imagem}</div>
      <h3>{pet.nome}</h3>
      <p className="especie">{pet.especie}</p>
      <p className="detalhe">
        {pet.personalidade} · {pet.raridade}
      </p>
      <p className="detalhe">⚡ Energia: {pet.energia}</p>
    </article>
  );
}

export default PetCard;