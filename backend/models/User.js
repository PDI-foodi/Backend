const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, "아이디를 입력하세요."],
      unique: true,
    },
    password: { type: String, required: [true, "비밀번호를 입력하세요."] },
    nickname: {
      type: String,
      required: [true, "닉네임을 입력하세요."],
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.statics.signUp = async function (id, password, nickname) {
  const idExist = await this.findOne({ id });
  if (idExist) {
    const error = new Error("이미 존재하는 아이디입니다.");
    error.name = "IdDuplicatedError";
    throw error;
  }

  const nicknameExist = await this.findOne({ nickname });
  if (nicknameExist) {
    const error = new Error("이미 존재하는 닉네임입니다.");
    error.name = "NicknameDuplicatedError";
    throw error;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await this.create({ id, password: hashedPassword, nickname });
  return {
    id: user.id,
    nickname: user.nickname,
  };
};

userSchema.statics.login = async function (id, password) {
  const user = await this.findOne({ id });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user.visibleUser;
    }
    const error = new Error("비밀번호가 일치하지 않습니다.");
    error.name = "PasswordMismatchError";
    throw error;
  }
  const error = new Error("존재하지 않는 아이디입니다.");
  error.name = "IdNotFoundError";
  throw error;
};

userSchema.statics.findPwd = async function (id, nickname) {
  const user = await this.findOne({ id });
  if (user) {
    if (user.nickname === nickname) {
      return user.visibleUser;
    }
    const error = new Error("닉네임이 일치하지 않습니다.");
    error.name = "NicknameMismatchError";
    throw error;
  }
  const error = new Error("존재하지 않는 아이디입니다.");
  error.name = "IdNotFoundError";
  throw error;
};

userSchema.statics.resetPwd = async function (id, password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await this.findOneAndUpdate(
    { id },
    { password: hashedPassword }
  );
  return user.visibleUser;
};

const visibleUser = userSchema.virtual("visibleUser");
visibleUser.get(function (value, virtual, doc) {
  return {
    id: doc.id,
    nickname: doc.nickname,
  };
});

module.exports = mongoose.model("User", userSchema);
