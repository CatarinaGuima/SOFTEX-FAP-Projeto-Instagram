// Importações necessárias
import { v4 as randomUUID } from "uuid";
import { faker } from "@faker-js/faker";

// Classe do POST
class Post {
  private _id: string = randomUUID();
  private _userName: string;
  private _avatarUrl: string;
  private _imageUrl: string;
  private _description: string;
  private _isLiked: boolean = false;
  private _numberOfLikes: number = 0;
  private _createAt: Date = new Date();
  private _isFollowing: boolean = false; // Adiciona o estado de seguimento

  // Construtor da Classe POST
  constructor(
    userName: string,
    avatarUrl: string,
    imageUrl: string,
    description: string
  ) {
    this._userName = userName;
    this._avatarUrl = avatarUrl;
    this._imageUrl = imageUrl;
    this._description = description;
  }

  // Implementa o botão de LIKE/LIKED para todos os posts
  like() {
    const post = document.getElementById(this._id);
    const btnLike = post?.querySelector(".post-icons .fa-heart, .fa-heart-o");

    if (!btnLike) return;

    this._isLiked = !this._isLiked;
    const likesElement = post?.querySelector("#hearts");

    // Remove o coração preenchido, adiciona o coração vazio e incrementa o número de likes
    if (this._isLiked) {
      this._numberOfLikes++;
      btnLike.classList.replace("fa-heart-o", "fa-heart");
      btnLike.classList.add("liked");
    } else {
      // Volta o coração vazio e decrementa o número de likes
      this._numberOfLikes--;
      btnLike.classList.replace("fa-heart", "fa-heart-o");
      btnLike.classList.remove("liked");
    }

    // Adiciona a classe de animação
    btnLike.classList.add("animate-like");

    // Remove a classe de animação após 300ms (igual ao tempo da animação no CSS)
    setTimeout(() => {
      btnLike.classList.remove("animate-like");
    }, 400);

    if (likesElement) {
      likesElement.textContent = `${this._numberOfLikes} likes`;
    }
  }

  // Implementa o botão de FOLLOW/UNFOLLOW
  follow() {
    // Seleciona o botão de seguir no post atual
    const followButton = document
      .getElementById(this._id)
      ?.querySelector("#menu-more-btn");

    // Verifica se o botão existe
    if (!followButton) return;

    // Alterna o estado de seguir
    this._isFollowing = !this._isFollowing;
    followButton.textContent = this._isFollowing ? "Unfollow" : "Follow";
  }

  // Implementa o evento de mostrar o coração sobre a imagem com o duplo clique de curtir
  showHeartOverImage() {
    const post = document.getElementById(this._id);
    const heartOverlay = post?.querySelector(".heart-overlay");

    if (heartOverlay) {
      heartOverlay.classList.add("show-heart");

      setTimeout(() => {
        heartOverlay.classList.remove("show-heart");
      }, 1000);
    }
  }

  // Implementa o evento de salvar o Post
  saveBookmarks() {
    alert("Seu item foi salvo!");
    const post = document.getElementById(this._id);
    const btnBookmark = post?.querySelector(".fa-bookmark-o");

    btnBookmark?.classList.replace("fa-bookmark-o", "fa-bookmark");
  }

  // Função para renderizar os posts no HTML
  renderOnHTML() {
    const postContainer = document.createElement("div");
    postContainer.className = "post-container";
    postContainer.id = this._id;

    const postHeader = `
      <header>
        <div class="menu-list">
          <div class="menu-profile">
            <img id="menu-profile-account" src="${this._avatarUrl}" alt="Avatar" />
            <div id="menu-profile-name">${this._userName}</div>
          </div>
          <div class="menu-more">
            <button id="menu-more-btn" class="menu-more-button">Follow</button>
            <div id="menu-more-dots" class="btn">
              <i class="fa fa-ellipsis-h"></i>
            </div>
          </div>
        </div>
      </header>`;

    const postImage = `
      <div class="post-image" style="position: relative;">
        <img class="image" src="${this._imageUrl}" alt="Post Image" />
        <i class="fa fa-heart heart-overlay fa-5x"></i>
      </div>`;

    const postIcons = `
      <div class="post-icons">
        <div class="menu-list-left">
          <div class="btn"><i class="fa fa-heart-o"></i></div>
          <div class="btn"><i class="fa fa-comment-o"></i></div>
          <div class="btn"><i class="fa fa-paper-plane-o"></i></div>
        </div>
        <div class="btn"><i class="fa fa-bookmark-o"></i></div>
      </div>
      <div id="likes">
        <i class="fa fa-heart"></i>
        <p id="hearts">${this._numberOfLikes} likes</p>
      </div>`;

    const postLegend = `
      <footer>
        <p id="legend">${this._description}</p>
        <span class="comments">Ver todos os comentários</span>
      </footer>`;

    postContainer.innerHTML = postHeader + postImage + postIcons + postLegend;
    document.body.appendChild(postContainer);

    // Evento de seguir/deixar de seguir
    const followButton = postContainer.querySelector(".menu-more-button");
    followButton?.addEventListener("click", () => this.follow());

    // Evento de curtir
    const likeButton = postContainer.querySelector(".fa-heart-o");
    likeButton?.addEventListener("click", () => this.like());

    // Evento de duplo clique na imagem
    const image = postContainer.querySelector(".image");
    image?.addEventListener("dblclick", () => {
      this.like();
      this.showHeartOverImage();
    });

    // Evento de salvar o post
    const bookmark = postContainer.querySelector(".fa-bookmark-o");
    bookmark?.addEventListener("click", () => this.saveBookmarks());
  }
}

// Criando 15 posts aleatórios com faker
for (let index = 0; index < 15; index++) {
  const post = new Post(
    faker.person.firstName(),
    faker.image.avatarGitHub(),
    faker.image.urlPicsumPhotos(),
    faker.lorem.paragraph()
  );

  post.renderOnHTML();
}
