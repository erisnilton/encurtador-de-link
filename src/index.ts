import express from "express";
import { accessLink, generateShortLink, getShortLink } from "./link-service.js";

const app = express();
const port = 3000;

// Middleware para JSON
app.use(express.static('public'))
app.use(express.json());

app.post("/shorten", async (req, res) => {
  // Pegar A requisição
  if (!req.body?.link) {
    res.status(400).send("Você deve enviar o link");
    return
  }

  let link: string;
  try {
    link = normalizeUrl(req.body.link);
  } catch (error) {
    res.status(400).send(error.message);
    return
  }

  // salvar no banco
  try {
    const result = await getShortLink(link);
    if (result) {
      res.send({
        short_link: result,
      });
      return;
    }
    const shortLink = await generateShortLink(link);

    res.send({shortLink});
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Erro ao salvar no banco" });
  }
});

app.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const link = await accessLink(id);
    if (link) {
      res.redirect(link);
    } else {
      res.status(404).send({ eror: "Link não encontrado!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Erro ao buscar o link" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

function normalizeUrl(link: string): string {
  let url: URL;
  try {
    url = new URL(link);
  } catch {
    throw new Error("Link inválido!");
  }

  if (url.protocol != "http:" && url.protocol != "https:") {
    throw new Error("Somente os protocolos http e https são aceitos!");
  }
  return url.toString();
}
