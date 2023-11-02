class ImageBookModel {
  imageId: number;
  name: string;
  isIcon: boolean;
  data: string;
  link: string;

  constructor(
    imageId: number,
    name: string,
    isIcon: boolean,
    data: string,
    link: string
  ) {
    this.imageId = imageId;
    this.name = name;
    this.isIcon = isIcon;
    this.data = data;
    this.link = link;
  }
}

export default ImageBookModel;
