import os
import json
from phi.agent import Agent
from phi.model.groq import Groq
from PyPDF2 import PdfReader
from dotenv import load_dotenv
from pydantic import BaseModel, Field
from typing import List
import re
from rich.pretty import pprint

# Load .env
load_dotenv('.env')
print("Chiave GROQ:", os.getenv("GROQ_API_KEY"))


# MODELLO Pydantic (se ti serve per validare dopo)
class QuizScript(BaseModel):
    domande: List[str] = Field(..., description="Lista di domande generate dal testo fornito.")
    risposte: List[str] = Field(..., description="Lista di risposte corrette per le domande generate.")


# Estrazione semplice dei primi 12000 caratteri dal PDF
def estrai_testo_limitato(pdf_path: str, max_char: int = 12000) -> str:
    try:
        reader = PdfReader(pdf_path)
        testo = ""
        for pagina in reader.pages:
            contenuto = pagina.extract_text()
            if contenuto:
                testo += contenuto + "\n"
            if len(testo) >= max_char:
                break
        return testo[:max_char].strip()
    except Exception as e:
        print(f"Errore durante l'estrazione del testo: {e}")
        return ""


# AGENTE
agent = Agent(
    model=Groq(id="gemma2-9b-it"),
    description="This agent creates True or False questions from text.",
    instructions=[
        "Devi fornire 4 domande rispondibili con vero o falso basandoti sul testo fornito.",
        "Fondamentale e cruciale che ritorni una risposta in formato JSON con i campi 'domande' e 'risposte esatte'.",
        "Devi fornire solamente la risosta che è richiesta in formato JSON.",
        "Non devi assolutamente scrivere altro oltre al JSON.",
        "IL JSON deve per forza iniziare con ```json e finire con ```"
    ]
)


# FUNZIONE PRINCIPALE
def generate_quiz() -> List[dict]:
    pdf_path = os.path.join(os.path.dirname(__file__), "data/pdf/PM.pdf")
    testo = estrai_testo_limitato(pdf_path)

    prompt = f"Crea 4 domande vero/falso sul seguente testo:\n\n{testo}"
    try:
        response = agent.run(prompt)
        content = response.content

        # Estrai il JSON tra ```json e ```
        if "```json" in content:
            json_str = content.split("```json", 1)[1].split("```")[0].strip()
        else:
            json_str = content.strip()

        quiz_data = json.loads(json_str)
        return [{
            "domande": quiz_data.get("domande", []),
            "risposte esatte": quiz_data.get("risposte esatte", [])
        }]

    except Exception as e:
        print(f"Errore durante la generazione del quiz: {e}")
        return []

def question_answer (text: str):
    agent2 = Agent(
    model=Groq(id="llama-3.3-70b-versatile"),
    description="This agent answer to question about work security certification.",
    instructions=[
        "Devi rispondere a domande riguardanti le certificazioni sulla sicurezza sul lavoro.",
        "Devi fornire delle risposte dettagliate e complete.",
        "Rispondi solamente in italiano, non includere nell'output altre lingue. Questo è super importante.",
        "Rispondi basandoti solo ed eslcusivamente sulla legislazione italiana.",
        "Se non sei sicuro della domanda chiedi di riformularla."
    ],
    add_history_to_messages=True,
    num_history_responses=3
    )

    response = agent2.run(text, stream=True)
    for item in response:
        last = item
    final=re.sub(r"<think>.*?</think>", "", last.content, flags=re.DOTALL).strip()
    pprint([m.model_dump(include={"role", "content"}) for m in agent.memory.messages])
    return final

