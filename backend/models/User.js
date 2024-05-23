const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    id: { type: String, required: [true, "아이디를 입력하세요."] },
    password: { type: String, required: [true, "비밀번호를 입력하세요."] },
    nickname: { type: String, required: [true, "닉네임을 입력하세요."] },
  },
  {
    timestamps: true,
  }
);

userSchema.statics.signUp = async function (id, password, nickname) {
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
    throw Error("incorrect password");
  }
  throw Error("incorrect id");
};

const visibleUser = userSchema.virtual("visibleUser");
visibleUser.get(function (value, virtual, doc) {
  return {
    id: doc.id,
    nickname: doc.nickname,
  };
});

module.exports = mongoose.model("User", userSchema);
