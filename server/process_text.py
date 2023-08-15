import pandas as pd
import numpy as np
import tensorflow as tf
import re

import ner_variable_storage

ner_model = tf.keras.models.load_model('../model/ner_model.h5')

# Feed sentence into model & highlight words depending on model output
def get_highlighted_sentence(sentence):
    # Tokenize sentence, convert to word indices, & pad
    words = sentence.split()
    sentence_length = len(words)
    word_indices = [ner_variable_storage.word_to_index.get(word, ner_variable_storage.word_to_index['UNK']) for word in words]
    padded_sequence = tf.keras.utils.pad_sequences([word_indices], maxlen=ner_variable_storage.max_sequence_length, padding='post', value=0)

    # Make predictions
    predictions = ner_model.predict(padded_sequence)

    # Format HTML code based on predictions, adding <mark> tags around entities to be highlighted
    tags = []
    print("Predictions:")
    for tag_probabilities in predictions[0]:
        tags.append(np.argmax(tag_probabilities))
    
    for i in range(sentence_length):
        if (tags[i] != 16):
            words[i] = f'<mark>{words[i]}</mark>'

    return ' '.join(words)

# Separate large blocks of text by sentence and process each sentence
def process_text(text):
    sentences = re.split(r'\.(?!\d)', text)
    non_empty_sentences = [sentence.strip() for sentence in sentences if sentence.strip()]
    sentence_html_code = list(map(lambda sentence: get_highlighted_sentence(sentence), non_empty_sentences))
    
    return ' '.join(sentence_html_code)

if __name__ == '__main__':
    # Sample test if we run this file in isolation (which doesn't happen in the chrome extension)
    print(get_highlighted_sentence("Millions of people gathered in my home state of Massachusetts because Jim was there."))