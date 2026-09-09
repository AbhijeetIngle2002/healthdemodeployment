import os

from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage


# Dummy OpenAI API key for testing only
os.environ["OPENAI_API_KEY"] = "sk-dummy-openai-key-123456789"


# Create the LangChain OpenAI model
llm = ChatOpenAI(
    model="gpt-4o-mini",
    temperature=0
)


# Send a message
response = llm.invoke(
    [
        HumanMessage(content="Hello! Explain what LangChain is in one sentence.")
    ]
)


# Print the response
print(response.content)
