function PetCard({ pet, onEditar, onRemover }) {
  const classeStatus = pet.status === "Disponível" ? "disponivel" : "adotado";
  const imagemEhUrl = /^https?:\/\//i.test(pet.imagem ?? "");

  return (
    <article className={`card ${classeStatus}`}>
      <span className={`selo ${classeStatus}`}>{pet.status}</span>

      <div className="card-imagem">
        {imagemEhUrl ? (
          <img src={pet.imagem} alt={`Imagem de ${pet.nome}`} loading="lazy" />
        ) : (
          <span aria-hidden="true">{pet.imagem || "🐾"}</span>
        )}
      </div>

      <h3>{pet.nome}</h3>
      <p className="especie">{pet.especie}</p>
      <p className="detalhe">
        {pet.personalidade} · {pet.raridade}
      </p>
      <p className="detalhe">⚡ Energia: {pet.energia}</p>

      <div className="acoes">
        <button
          type="button"
          className="botao pequeno"
          onClick={() => onEditar(pet)}
          aria-label={`Editar ${pet.nome}`}
        >
          Editar
        </button>
        <button
          type="button"
          className="botao pequeno perigo"
          onClick={() => onRemover(pet)}
          aria-label={`Remover ${pet.nome}`}
        >
          Remover
        </button>
      </div>
    </article>
  );
}

export default PetCard;
