import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';

export interface WeightedTag {
  amusement_park: number;
  aquarium: number;
  art_gallery: number;
  casino: number;
  museum: number;
  park: number;
  tourist_attraction: number;
  zoo: number;
}

@Injectable()
export class OpenaiService {
  private configuration: Configuration;
  private openai: OpenAIApi;
  constructor() {
    this.configuration = new Configuration({
      organization: process.env.OPENAI_API_ORG,
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(this.configuration);
  }

  public async getTagWeights(tags: string[]) {
    const tagString = tags.join(' ');
    const system = `This task predicts the customer's travel theme preferences.
For the input travel tag, specify a real number preference from 0 to 1 for each place category and return it only as JSON.

category:
{
amusement_park
aquarium
art_gallery
casino
museum
park
tourist_attraction
zoo
}`;
    const completion = await this.openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: system,
        },
        {
          role: 'user',
          content: tagString,
        },
      ],
      temperature: 0,
      max_tokens: 300,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    const AIRes = completion.data.choices[0].message.content;
    const AIResJSON = JSON.parse(AIRes);
    return AIResJSON as WeightedTag;
  }
}
