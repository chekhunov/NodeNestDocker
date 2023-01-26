export class CreatePostDto {
  readonly title: string
  readonly content: string
  //лучше доставать его из токена
  readonly userId: number
}