import React, { useMemo } from "react";
import {
  FullScreanDiv,
  FormHeaderText,
  LogoText,
  FormElement,
  FormLabelStyled,
  RegisterLinkContainer,
  FormGroup,
} from "../authStyledElements";
import { Input } from "../../../Common/Components/Input/Input";
import { useForm, Controller } from "react-hook-form";
import { RegisterDto } from "../../../Dto/userDto";
import {
  emailReg,
  passwordLength,
  phoneReg,
} from "../../../Common/Constants/regex";
import { Password } from "../../../Common/Components/Input/Password";
import { selectCustomStyles } from "../../../Common/Components/selectCustomStyle";
import {
  monthOptions,
  OptionTypeValueNumber,
  sexOptions,
} from "../../../Common/Constants/selectOptions";
import Select from "react-select";
import { Checkbox } from "../../../Common/Components/Checkbox";
import { SelectComponent } from "../Select";
import { ButtonStyled } from "../../../Common/Components/buttonStyled";
import { useAppDispatch } from "../../../Config/Redux/core";
import { userActions } from "../../../Config/Redux/userSlice";
import { ErrorInputLabel } from "../../../Common/Components/ErrorInputLabel";
import { RegisterStyledForm, RowOfTwo, RowOfElements } from "./registerStyles";

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    control,
    getValues,
  } = useForm<RegisterDto>();

  const dispatch = useAppDispatch();
  const submitClick = (data: RegisterDto) => {
    console.log(data);
    //validation??
    dispatch(userActions.registerUser(data));
  };

  const todayYear = new Date().getFullYear();
  const yearOptions = useMemo(() => {
    const years = Array.from(new Array(80), (val, index) => todayYear - index);
    return years.map((value) => {
      return {
        label: value.toString(),
        value: value,
      } as OptionTypeValueNumber;
    });
  }, [todayYear]);

  return (
    <FullScreanDiv gap="16px">
      <LogoText>StaffPro</LogoText>
      <RegisterStyledForm
        onSubmit={handleSubmit((e) => submitClick(e as RegisterDto))}
      >
        <FormHeaderText>Зарегистрируйтесь</FormHeaderText>

        <FormElement>
          <Input
            placeholder="Email"
            {...register("email", {
              required: "Обязательное поле",
              pattern: {
                value: emailReg,
                message: "invalid email address",
              },
            })}
            error={errors.email?.message}
          />
          <ErrorInputLabel text={errors.email?.message} />
        </FormElement>
        <FormElement>
          <Input
            placeholder="Фамилия"
            {...register("lastName", {
              required: "Обязательное поле",
            })}
            error={errors.lastName?.message}
          />
          <ErrorInputLabel text={errors.lastName?.message} />
        </FormElement>
        <RowOfTwo>
          <FormElement>
            <Input
              placeholder="Имя"
              {...register("firstName", {
                required: "Обязательное поле",
              })}
              error={errors.firstName?.message}
            />
            <ErrorInputLabel text={errors.firstName?.message} />
          </FormElement>
          <FormElement>
            <Input
              placeholder="Отчество"
              {...register("fatherName", {
                required: "Обязательное поле",
              })}
              error={errors.fatherName?.message}
            />
            <ErrorInputLabel text={errors.fatherName?.message} />
          </FormElement>
        </RowOfTwo>
        <FormElement>
          <Password
            placeholder="Пароль"
            {...register("password", {
              required: "Обязательное поле",
              pattern: {
                value: passwordLength,
                message: "Пароль должен содержать от 8 до 64 символов",
              },
            })}
            error={errors.password?.message}
          />
          <ErrorInputLabel text={errors.password?.message} />
        </FormElement>
        <FormElement>
          <Password
            placeholder="Повторите пароль"
            {...register("passwordRepeat", {
              required: "Обязательное поле",
              validate: {
                positive: (value) =>
                  value === getValues().password || "Пароли не совпадают",
              },
            })}
            error={errors.passwordRepeat?.message}
          />
          <ErrorInputLabel text={errors.passwordRepeat?.message} />
        </FormElement>
        <FormGroup>
          <FormLabelStyled>Дата рождения</FormLabelStyled>
          <RowOfElements>
            <FormElement>
              <Input
                type="number"
                placeholder="День"
                style={{ width: "170px" }}
                {...register("bDate", {
                  required: "Обязательное поле",
                  min: { value: 1, message: "Минимум 1" },
                  max: { value: 31, message: "Максисмум 31" },
                })}
                error={errors.bDate?.message}
              />
              <ErrorInputLabel text={errors.bDate?.message} />
            </FormElement>
            <FormElement>
              <Controller
                control={control}
                name="bMonth"
                rules={{
                  required: "Обязательное поле",
                }}
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <SelectComponent
                    placeholder="Месяц"
                    options={monthOptions}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    ref={ref}
                    name={name}
                    width="225px"
                    error={errors.bMonth?.message}
                  />
                )}
              />
              <ErrorInputLabel text={errors.bMonth?.message} />
            </FormElement>
            <FormElement>
              <Controller
                control={control}
                name="bYear"
                rules={{
                  required: "Обязательное поле",
                }}
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <SelectComponent
                    placeholder="Год"
                    options={yearOptions}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    ref={ref}
                    name={name}
                    width="153px"
                    error={errors.bYear?.message}
                  />
                )}
              />
              <ErrorInputLabel text={errors.bYear?.message} />
            </FormElement>
          </RowOfElements>
        </FormGroup>

        <RowOfElements>
          <FormElement>
            <Input
              type="tel"
              placeholder="Телефон (опционально)"
              style={{ width: "349px" }}
              {...register("phone", {
                pattern: {
                  value: phoneReg,
                  message: "Такого номера не существует",
                },
              })}
              error={errors.phone?.message}
            />
            <ErrorInputLabel text={errors.phone?.message} />
          </FormElement>
          <FormElement>
            <Controller
              control={control}
              name="sex"
              rules={{
                required: "Обязательное поле",
              }}
              render={({ field: { onChange, onBlur, value, name, ref } }) => (
                <SelectComponent
                  placeholder="Пол"
                  options={sexOptions}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  ref={ref}
                  name={name}
                  width="225px"
                  error={errors.sex?.message}
                />
              )}
            />
            <ErrorInputLabel text={errors.sex?.message} />
          </FormElement>
        </RowOfElements>
        <FormElement>
          <Checkbox
            initialValue={false}
            label="Я согласен с "
            {...register("userAgreement", {
              required: "Для регистрации необходимо принять условия соглашения",
            })}
          >
            <a href="#">пользовательским соглашением</a>
            <span> и </span>
            <a href="#">
              политикой обработки персональных данных пользователей
            </a>
          </Checkbox>
          <ErrorInputLabel text={errors.userAgreement?.message} />
        </FormElement>
        <ButtonStyled
          type="submit"
          style={{ width: "100%" }}
          onClick={() => console.log("clicked")}
        >
          Создать аккаунт
        </ButtonStyled>

        <RegisterLinkContainer>
          <span>Уже есть аккаунт в StaffPro? &nbsp;</span>
          <a href="/unauth/login">Войдите</a>
        </RegisterLinkContainer>
      </RegisterStyledForm>
    </FullScreanDiv>
  );
};