import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';
import { WeightedTag } from 'src/plans/plan.schema';

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
    const tagString = '#여행 #' + tags.join(' #');
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
    let AIResJSON: object;
    try {
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
      AIResJSON = JSON.parse(AIRes);
    } catch (e) {
      AIResJSON = {
        amusement_park: 0.1,
        aquarium: 0.1,
        art_gallery: 0.1,
        casino: 0.1,
        museum: 0.1,
        park: 0.1,
        tourist_attraction: 0.1,
        zoo: 0.1,
      };
    }
    return AIResJSON as WeightedTag;
  }
}
