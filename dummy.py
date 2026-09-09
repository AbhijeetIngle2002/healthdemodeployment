import os

from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage


# ============================================================
# TEST: Deployment Intelligence Platform - Cost Gate
# ============================================================

# Dummy API key
os.environ["OPENAI_API_KEY"] = "sk-dummy-openai-key-123456789"


# ------------------------------------------------------------
# 1. OpenAI / LangChain
# ------------------------------------------------------------

llm = ChatOpenAI(
    model="gpt-4o-mini",
    temperature=0
)


# ------------------------------------------------------------
# 2. OpenAI request
# ------------------------------------------------------------

response = llm.invoke(
    [
        HumanMessage(
            content="Analyze this deployment and identify potential cost impact."
        )
    ]
)

print("LLM Response:")
print(response.content)


# ------------------------------------------------------------
# 3. Simulated application usage
# ------------------------------------------------------------

def analyze_deployment():
    prompt = """
    Analyze the following deployment:

    - New AI dependency added
    - External API usage introduced
    - Potential monthly token consumption
    - Additional infrastructure cost
    """

    result = llm.invoke(
        [
            HumanMessage(content=prompt)
        ]
    )

    return result.content


if __name__ == "__main__":
    result = analyze_deployment()
    print(result)
